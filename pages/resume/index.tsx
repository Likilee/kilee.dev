import BorderedBadge from 'components/BorderedBadge'
import SeoHead from 'components/SeoHead'
import PageLayout from 'layouts/PageLayout'
import { ComponentType, PropsWithChildren } from 'react'
import { IconBaseProps } from 'react-icons/lib'
import {
  TbMail,
  TbBrandGithub,
  TbPencil,
  TbBriefcase,
  TbRocket,
  TbSchool,
  TbPlant,
  TbMedal2,
} from 'react-icons/tb'

export default function Resume() {
  return (
    <PageLayout>
      <SeoHead
        title="이력서"
        description="웹 프론트엔드 개발자 이기훈의 이력서입니다."
        ogType="article"
      />
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white ">
        Resume
      </h1>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        2년차 프론트엔드 개발자, 두 번의 창업 실패 경험이 있습니다. 개발을 비즈니스의 성장의
        수단으로 믿습니다. 깨끗하고 효율적인 코드를 작성하고, 프로세스를 자동화하고, 지속적으로
        개선하는 것을 좋아합니다
      </p>
      <article className="w-full">
        <section
          id="introduction"
          className="flex flex-col md:flex-row justify-between gap-4 md:items-center mt-8 mb-8"
        >
          <div id="profile" className="flex flex-col gap-1 md:gap-2">
            <h1 className="text-4xl font-black md:text-5xl ">이기훈</h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-300 relative left-0.5 mb:left-1">
              Web Frontend developer
            </p>
          </div>
          <div id="contact" className="flex flex-col gap-1">
            {/* <h2>Contact</h2>
            <hr className="mb-4 mt-4 w-8 border-t-2 border-gray-300" /> */}
            <p className="flex items-center gap-2">
              <TbMail />
              <span>leekilee42@gmail.com</span>
            </p>
            <p className="flex items-center gap-2">
              <TbBrandGithub />
              <ExternalLink href="https://github.com/Likilee">
                https://github.com/Likilee
              </ExternalLink>
            </p>
            <p className="flex items-center gap-2">
              <TbPencil />
              {/* <ExternalLink href="https://kilee.io">https://kilee.io</ExternalLink> */}
              <ExternalLink href="https://kilee.dev">https://kilee.dev</ExternalLink>
            </p>
          </div>
        </section>
        <div id="contents" className="flex flex-col gap-4">
          <Section.Wrapper>
            <Section.Title Icon={TbBriefcase}>PROFESSIONAL EXPERIENCE</Section.Title>
            {/* Exem */}
            <Project.Title organization="(주)EXEM" period="2022.08 - 현재" />
            <Project.Role>연구원 / 개발2본부 프론트엔드팀</Project.Role>
            <Project.Stack>
              <BorderedBadge>Typescript</BorderedBadge>
              <BorderedBadge>Vue3</BorderedBadge>
              <BorderedBadge>Tanstack-query</BorderedBadge>
              <BorderedBadge>Vite</BorderedBadge>
              <BorderedBadge>Storybook</BorderedBadge>
              <BorderedBadge>Apache-Echarts</BorderedBadge>
            </Project.Stack>
            <Project.Summary>
              DataSaker - Infrastructure Monitoring as a Service - 프론트엔드 개발 중입니다.
              대량의 시계열 데이터를 다양한 형태로 시각화하는 대시보드 기능의 설계와 개발 및
              아키텍처 설계를 주도하고 있습니다. 협업 프로세스 개선을 위해 칸반 매서드를 팀에
              도입하고 리드하고 있습니다.
            </Project.Summary>

            {/* 뽑아조 */}
            <Project.Title organization="뽑아조" period="2017.08 - 2020.04" />
            <Project.Role>대표 / 서비스 개발 및 운영</Project.Role>
            <Project.Stack>
              <BorderedBadge>사업화</BorderedBadge>
              <BorderedBadge>리더십</BorderedBadge>
              <BorderedBadge>행동력</BorderedBadge>
              <BorderedBadge>사업 기획</BorderedBadge>
              <BorderedBadge>위기 관리</BorderedBadge>
            </Project.Stack>
            <Project.Summary>
              사업화를 위해 빠른 MVP 개발과 초기 유저 테스트를 진행하고, 이를 기반으로 사업화
              가능성을 증명하여 정부지원사업 수주를 하였습니다. 또한 전문 SI 업체와 협업하여
              서비스를 개발하고, 산학협력 인턴십 프로그램을 운영하여 8명의 인턴분들이 주도적으로
              업무를 수행할 수 있도록 이끌었습니다. 제휴 인쇄소 5개소를 확보하여 중앙대학교를
              거점으로 서비스를 운영하고, 2019 도전K스타트업 대회에서 본선에 진출하였습니다.
              개발 역량없이 IT 서비스를 사업화하는 것은 불가능하다는 것을 깨닫고 폐업 후
              개발자로 전향하였습니다.
            </Project.Summary>
            {/* <Project.AchieveMentList>
              <li>
                대시보드에서 시계열 데이터의 안정적인 사용을 위한 데이터 시각화 위젯 인터페이스
                설계 및 개발 주도
              </li>
              <li>프론트엔드 성능 병목 현상 분석 및 개선(p50: 5000ms ➡️ p50: 300ms)</li>
              <li>
                디자인 팀과의 소통 및 프로젝트 컴포넌트 파편화 감소를 위해 스토리북 적용. Github
                Actions 및 Chromatic을 통해 CI를 적용
              </li>
              <li>
                팀의 생산성을 높이기 위해 Git 컨벤션 정립 및 Lint Stage, Github PR template 적용
              </li>
              <li>
                스프린트 목표 달성률을 높이기 위해 스프린트 관리 체계화. 이전 대비 스프린트 Goal
                달성률 평균 20% 이상 증가
              </li>
              <li>팀 역량 강화를 위한 매주 프론트엔드 팀 Tech Talk 프로그램 활성화 및 운영</li>
            </Project.AchieveMentList> */}
          </Section.Wrapper>

          <Section.Wrapper>
            <Section.Title Icon={TbRocket}>PERSONAL EXPERIENCE</Section.Title>
            <Project.Title
              organization="42DashBoard"
              period="2022.06 - 2022.07"
            ></Project.Title>
            <Project.Role>{`프론트엔드 개발 / 7인 팀프로젝트`}</Project.Role>
            <Project.Stack>
              <BorderedBadge>Typescript</BorderedBadge>
              <BorderedBadge>React.js</BorderedBadge>
              <BorderedBadge>Chart.js</BorderedBadge>
              <BorderedBadge>MUI</BorderedBadge>
              <BorderedBadge>React-grid-layout</BorderedBadge>
              <BorderedBadge>Zustand</BorderedBadge>
            </Project.Stack>
            <Project.Summary>
              42서울 교육 통계 모니터링 시스템 개발을 주도했습니다. 주요 책임에는 프런트 엔드
              프로젝트 아키텍처 설계, 상태 관리 및 데이터 시각화가 포함되었습니다. 7명으로
              구성된 팀과 협력하여 7주 동안 6개의 스프린트에 참여했습니다.
            </Project.Summary>
            <Project.AchieveMentList>
              <li>
                의존성의 분리를 위한 실험적{' '}
                <ExternalLink href="https://dev.to/itshugo/a-different-approach-to-frontend-architecture-38d4">
                  아키텍처
                </ExternalLink>{' '}
                학습 및 적용
              </li>
              <li>Chart.js 라이브러리를 사용하여 데이터 시각화 컴포넌트 개발 주도</li>
              <li>React-grid-layout 을 사용하여, 대시보드 개인화 기능 개발 주도</li>
              <li>
                <ExternalLink href="https://github.com/innovationacademy-kr/42dashboard">
                  리포지토리 링크
                </ExternalLink>
              </li>
            </Project.AchieveMentList>

            {/* 🚀 Transendence */}
            <Project.Title
              organization="멀티 플레이 핑퐁 게임"
              period="2021.12 - 2022.02"
            ></Project.Title>
            <Project.Role>{`팀장 · 백엔드 개발 / 3인 팀프로젝트`}</Project.Role>
            <Project.Stack>
              <BorderedBadge>Typescript</BorderedBadge>
              <BorderedBadge>Nest.js</BorderedBadge>
              <BorderedBadge>GraphQl</BorderedBadge>
              <BorderedBadge>Passport</BorderedBadge>
              <BorderedBadge>TypeOrm</BorderedBadge>
              <BorderedBadge>Docker</BorderedBadge>
            </Project.Stack>
            <Project.Summary>
              42서울에서 최종 프로젝트의 일환으로 웹 기술을 사용하여 온라인 실시간 탁구 게임을
              서비스를 개발했습니다. 3인 팀의 일원으로 7주 동안 백엔드 작업을 했습니다.
            </Project.Summary>
            <Project.AchieveMentList>
              <li>
                데이터베이스 스키마를 설계하며{' '}
                <ExternalLink href="https://user-images.githubusercontent.com/35288028/180633155-ad402e72-7928-4020-b326-fbbcd81ce14c.png">
                  ERD 작성
                </ExternalLink>
                을 경험
              </li>
              <li>GraphQl을 사용한 유연한 API 개발 및 사용 경험</li>
              <li>
                Docker-compose와 Ngrok를 조합하여 로컬 환경에서 스크립트 작성을 통해 개발서버
                배포 경험
              </li>
              <li>Nest.JS의 Module, Controller, Provider의 구조를 지키며 개발</li>
              <li>TypeOrm을 사용한 CRUD 작업 경험</li>
              <li>Oauth2.0을 사용한 로그인 시스템 개발</li>
              <li>
                <ExternalLink href="https://github.com/VoiceSpaceUnder5/transcendence">
                  리포지토리 링크
                </ExternalLink>
              </li>
            </Project.AchieveMentList>

            {/* 🚀 Giggle Forest */}
            <Project.Title organization="Giggle Forest" period="2021.07 - 2021.11" />
            <Project.Role>{`팀장 · 프론트엔드 개발 · DevOps · 기획 · 디자인 / 4인 팀프로젝트`}</Project.Role>
            <Project.Stack>
              <BorderedBadge>Typescript</BorderedBadge>
              <BorderedBadge>Github Actions</BorderedBadge>
              <BorderedBadge>AWS</BorderedBadge>
              <BorderedBadge>Docker</BorderedBadge>
              <BorderedBadge>WebGL</BorderedBadge>
              <BorderedBadge>Jira</BorderedBadge>
              <BorderedBadge>Confluence</BorderedBadge>
            </Project.Stack>
            <Project.Summary>
              WebRTC 와 WebGL 기술을 활용한 웹 기반 캐쥬얼 음성채팅 메타버스 오픈소스
              프로젝트입니다. DevOps 와 FrontEnd 그래픽 모듈 개발 작업을 주도했습니다. 국내외
              3개 대회에 수상하였습니다. 4개월 동안 팀원 3명과 협업했습니다.
            </Project.Summary>
            <Project.AchieveMentList>
              <li>
                WebGL 기반 2D 그래픽 라이브러리인 Pixi.js를 이용하여 실시간 립싱크를 지원하는
                그래픽 모듈을 개발
              </li>
              <li>
                테스트 및 배포 자동화를 위해 Github Actions, AWS(EC2, S3, Code Deploy), Docker를
                활용하여 CI/CD 파이프라인 구현
              </li>
              <li>
                커뮤니케이션 효율을 증진하기 위해 브랜치 전략, 코드 컨벤션, 커밋 컨벤션 정립 및
                문서를 작성하고 팀원들 교육 진행. CI 자동화
              </li>
              <li>애자일 프로세스를 적용하여 프로젝트 관리(4개월 / 총 11회 스프린트)</li>
              <li>2022 동북아 공개소프트웨어 포럼 우수 프로젝트상 수상</li>
              <li>2021 ‘공개SW개발자대회’ 일반부 대상(과기정통부 장관상) 수상</li>
              <li>2021 ‘42Seoul 오픈프로젝트’ 최우수상(정보통신기획평가원장 상) 수상</li>
              <li>
                <ExternalLink href="https://github.com/VoiceSpaceUnder5/VoiceSpace">
                  리포지토리 링크
                </ExternalLink>
                {` · `}
                <ExternalLink href="https://www.youtube.com/watch?v=ufxFfA7_ntU">
                  시연 영상
                </ExternalLink>
                {` · `}
                <ExternalLink href="https://42place.innovationacademy.kr/archives/9895">
                  회고 블로그
                </ExternalLink>
              </li>
            </Project.AchieveMentList>
          </Section.Wrapper>
          <Section.Wrapper>
            <Section.Title Icon={TbPlant}>{`EDUCATIONAL EXPERIENCE`}</Section.Title>
            <Project.Title organization="Ray-Tracing 교재 제작" period="2021.01 - 2021.04" />
            <Project.Stack>
              <BorderedBadge>C</BorderedBadge>
            </Project.Stack>
            <Project.Summary>
              42서울 프로젝트의 일환으로 컴퓨터 그래픽스 학습에서 동료들이 직면한 문제를
              해결하기 위한 실용적인 커리큘럼을 개발했습니다. 많은 양의 도메인 학습이 필요하고 C
              프로그래밍 학습의 어려움이 결합되어 커리큘럼에 병목 현상이 발생했습니다. 이러한
              문제를 해결하기 위해 실습을 통해 도메인 학습을 세분화하여 정복하기 위한 실용적인
              가이드를 만들었습니다.
            </Project.Summary>
            <Project.AchieveMentList>
              <span>
                <ExternalLink href="https://github.com/GaepoMorningEagles/mini_raytracing_in_c">
                  실습 교재 링크
                </ExternalLink>
                {` · `}
                <ExternalLink href="https://github.com/Likilee/raytracer_in_c">
                  데모 리포지토리 링크
                </ExternalLink>
              </span>
            </Project.AchieveMentList>
            <Project.Title organization="Makefile Session" period="2021.06" />
            <Project.Stack>
              <BorderedBadge>C</BorderedBadge>
              <BorderedBadge>Makefile</BorderedBadge>
            </Project.Stack>
            <Project.Summary>
              C 프로젝트에 어려움을 겪고 있는 동료를 위해 컴파일러 단계 및 Makefile 작업을
              다루는 C 프로그래밍 교육 세션을 개발했습니다. 120명의 참가자와 함께 2번의 세션을
              직접 진행했습니다. 동료들이 자체 세션을 진행할 수 있도록 교육 자료를 공유했습니다.
            </Project.Summary>
            <Project.AchieveMentList>
              <span>
                <ExternalLink href="https://chill-hyssop-446.notion.site/Makefile-5515ac58527c481cb67f00d30a19a7f9">
                  실습 교재 링크
                </ExternalLink>
                {` · `}
                <ExternalLink href="https://github.com/Likilee/Makefile_Training">
                  실습 자료 링크
                </ExternalLink>
              </span>
            </Project.AchieveMentList>
          </Section.Wrapper>

          <Section.Wrapper>
            <Section.Title Icon={TbMedal2}>AWARD</Section.Title>
            <Project.Title
              organization="Northeast Asia OSS Promotion Forum 2022"
              period="2022.11"
            />
            <Project.Role>Outstanding Achievement</Project.Role>

            <Project.Title organization="2021 공개소프트웨어 개발자 대회" period="2021.11" />
            <Project.Role>일반부 대상(과학기술정보통신부 장관상)</Project.Role>

            <Project.Title organization="2021 42Seoul 오픈 프로젝트" period="2021.11" />
            <Project.Role>최우수상(정보통신기획평가원 원장상)</Project.Role>
          </Section.Wrapper>

          <Section.Wrapper>
            <Section.Title Icon={TbSchool}>{`EDUCATION`}</Section.Title>
            <Project.Title organization="이노베이션 아카데미 42Seoul" period="2022.02" />
            <Project.Role>MemberShip</Project.Role>
            <Project.Title organization="중앙대학교" period="2018.03" />
            <Project.Role>토목학 학사 · 창업학 학사</Project.Role>
          </Section.Wrapper>
        </div>
      </article>
    </PageLayout>
  )
}

namespace Section {
  export function Wrapper({ children }: PropsWithChildren) {
    return <div className="w-full min-w-full mb-4">{children}</div>
  }

  export function Title({
    Icon,
    children,
  }: PropsWithChildren<{ Icon: ComponentType<IconBaseProps> }>) {
    return (
      <div className="flex gap-2 text-xl sm:text-2xl font-bold border-b-2 border-gray-300 mb-2">
        <Icon className="text-2xl sm:text-3xl text-gray-300 " />
        <h1 className=" pb-1">{children}</h1>
      </div>
    )
  }
}

namespace Project {
  export function Title({ organization, period }: { organization: string; period: string }) {
    return (
      <div className="flex justify-between gap-3 items-baseline">
        <h3 className="text-lg font-semibold">{organization}</h3>
        <p className="text-gray-500 dark:text-gray-300">{period}</p>
      </div>
    )
  }
  export function Role({ children }: PropsWithChildren) {
    return (
      <div>
        <h4 className="italic mb-1 ">{children}</h4>
      </div>
    )
  }
  export function Stack({ children }: PropsWithChildren) {
    return <p className="mb-2">{children}</p>
  }

  export function Summary({ children }: PropsWithChildren) {
    return (
      <p className="p-2 my-2 border-2 rounded-md border-gray-200 dark:border-gray-700">
        {children}
      </p>
    )
  }

  export function AchieveMentList({ children }: PropsWithChildren) {
    return (
      <ul className="flex flex-col gap-1 list-disc list-inside pl-6 -indent-5 mb-4">
        {children}
      </ul>
    )
  }
}

function ExternalLink({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <a
      className="underline text-blue-700 dark:text-blue-400 "
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {children}
    </a>
  )
}
