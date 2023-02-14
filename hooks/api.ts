import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { ViewsTable } from 'lib/planetscale'

/* 💡 Get All View counts */
const getAllView = async (): Promise<ViewsTable[]> => {
  const res = await fetch(`/api/views`)
  return res.json()
}

export const useAllViewCountQuery = () => {
  return useQuery({
    queryKey: ['views'],
    queryFn: () => getAllView(),
  })
}

/* 💡 Get All View counts for ssg*/
export const getViewCountPrefetch = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['views'], getAllView)

  return dehydrate(queryClient)
}

/* 💡 Post View Count with slug */
const postViewBySlug = (slug: string) =>
  fetch(`/api/views/${slug}`, {
    method: 'POST',
  })

export const useViewCountMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postViewBySlug,
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
