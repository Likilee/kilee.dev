import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { getAllView, postViewBySlug } from 'lib/api'
import { ViewsTable } from 'lib/planetscale'

export const useAllViewCountQuery = () => {
  return useQuery({
    queryKey: ['views'],
    queryFn: getAllView,
  })
}

/* 💡 Get All View counts for ssg*/
export const getViewCountPrefetch = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['views'], getAllView)

  return dehydrate(queryClient)
}

export const useViewCountMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postViewBySlug,
    onMutate: async (slug) => {
      await queryClient.cancelQueries({ queryKey: ['views'] })
      const previousViews = queryClient.getQueryData<ViewsTable[]>(['views'])
      const newViews = previousViews?.map((view) =>
        view.slug === slug ? { slug, count: view.count } : view,
      )
      queryClient.setQueryData(['views'], () => newViews)
      return { previousViews }
    },
    onError: (err, newViews, context) => {
      queryClient.setQueryData(['views'], context?.previousViews)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['views'] })
    },
  })
}
/* 💡 Get view by Slug */
// const getViewBySlug = async (slug: string): Promise<ViewsTable> => {
//   const res = await fetch(`/api/views/${slug}`)
//   return res.json()
// }
// export const useViewCountQuery = (slug: string) => {
//   return useQuery({
//     queryKey: ['views', slug],
//     queryFn: ({ queryKey }) => getViewBySlug(queryKey[1]),
//   })
// }
