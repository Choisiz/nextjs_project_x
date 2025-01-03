# next.js개요

1. 기본적으로는 src 바깥에 app폴더가 있으나,
   주소와 관련된 파일은 app폴더에 넣고
   관련없는 파일은 app폴더 바깥에 두자

2. nextConfig.js: next에 대한 설정

3. 레이아웃 1.레이아웃: 페이지를 전환하는데도 안바뀌는 부분은 레이아웃, 공통적으로 사용되는UI 2.페이지 전환시 {children}안에 페이지컴포넌트가 생성, 즉 레이아웃이 페이지를 포함하고있다. 3.로그인했을때와 안했을때의 레이아웃이 다르듯이 화면을 구성할때 레이아웃 구성을 고려해야함

4. [폴더명]: 다이나믹라우터라고하며,변수에 담는거랑 비슷한 느낌임, 후순위
5. (폴더명): 레이아웃을 그룹짓고 싶다면 (폴더명),()안에있는 폴더명은 주소창에 관여를 안한다. ex)(home)/login => /login

   - 레이아웃은 만들수 있음

6. 페이지넘나들때 리렌더링 x: layout.tsx
   페이지넘나들때 리렌더링 하고싶다?: template.tsx(페이지넘나들때 기록해야할시, 구글애널리틱스 등)
   공존하면안됨 둘중에 하나

7. Link: Next는 <a></a>태그대신 Link를 사용 <a></a>태그는 페이지가 새로고침되기 때문, 리액트나 넥스트는 새로고침 유의
8. Image: png 파일도 import해서 사용이 가능하다! 하지만 img가 아닌 Image로 사용해야 함. ⇒ 이 경우 next에서 알아서 최적화를 해줌.

# 클라이언트 컴포넌트만들기

1. 서버 컴포넌트(리액트18)

- 아무것도 설정안하면 기본 컴포넌트는 서버컴포넌트
- 문제는 hooks를 사용못함(ex: useState)

2. 클라이언트 컴포넌트

- 변경하는 방법 ⇒ 맨위에 `“use client”` 하나만 추가

# 패러렐라우트

1. 페러랠라우트: @폴더명

- 폴더가 다른 페이지를 동시에 보여주는법(하나의 화면에 여러페이지 랜더링), 단 폴더구조가 다르면 페러렐은 안된다.
- 레이아웃에서 쓸수있다.
- 필요없을때 혹은 기본값 default.tsx

# 인터셉팅라우팅

1. (..)폴더명

- 주소가 같은데 같이 뜨도록 만들어주는것
- 현재 레이아웃 내 애플리케이션의 다른 부분에서 경로를 로드할 수 있다.
- 사용자가 다른 컨텍스트로 전환하지 않고도 경로의 내용을 표시하려는 경우 유용하게 사용된다.
- 인터셉팅은 `(..)` 를 사용하여 정의할 수 있는데 이는 상대 경로(`/..` ) 규칙과 유사
- `(.)` 동일한 수준 세그먼트와 일치
- `(..)` 한 수준 위 세그먼트와 일치
- `(..)(..)` 두 수준 위 세그먼트와 일치
- `(...)` 루트 app 디렉터리 세그먼트와 일치

2. 클라이언트에서 라우팅시만 인터셉트 라우팅이 적용

- 동작이나 이벤트 의해 발동하며, 직접주소입력이나 새로고침시에는 일반라우팅경로로 이동
- 사용자가 링크를 클릭, js이벤트로 페이지 전환, 브라우저 내에서 사용자가 페이지 간 이동을 할 때만 인터셉트 라우팅이 발동된다.
- 직접 URL 입력이나 새로고침 시: 사용자가 주소창에 특정 경로를 입력하거나 페이지를 새로고침할 때는
  서버에서 페이지를 다시 불러오고 라우팅을 결정하게 된다.
  이 경우는 클라이언트 내의 JavaScript 이벤트가 발동되지 않기 때문에 일반적인 라우터 경로가 적용

3. 서버에서 리다이렉트(-useRouter)

- 서버에서 리다이렉트하면 인터셉팅이 제대로 되지않는다.
  이유는 서버리다이렉트같은경우 클라를 거치지 않고 바로 새로운 경로로 이동되기 때문에 개입 할 수 없다.
  그래서 리다이렉트대신 useRouter등으로 한다.

4. 라우팅(push, replace)

- push랑 replace는 이동하는건 비슷하나. 뒤로가기시에 다른점이있다.
- push는 전페이지 이동이나 replace는 처음화면으로 이동(replace는 히스토리가 안남음)

# 패러럴 vs 인터셉팅 차이

- 패러렐 라우트가 있고 인터셉팅 라우트가 있다면 메인의 ex)i/flow/page가 처리하는 게 아니라 인터셉팅 라우트의 page가 처리하게 됨
- Parallel Routes는 한 페이지에서 여러 섹션을 동시에 렌더링하는 기능일 뿐, 각 URI에 맞는 새로운 상태를 독립적으로 할당하지 않는다.
  그래서 Parallel Routes로 구현할 경우, 모든 섹션이 하나의 URI에 종속된다.
- URL에 맞춰 각 섹션의 상태가 새롭게 할당되거나 변경되는 방식이 아님.
- 즉, Parallel Routes는 지정된 레이아웃 내에서 여러 컴포넌트를 평행하게 배치하는 것이기 때문에, URI 변경에 따라 개별 상태를 새로 할당하거나 리셋하는 기능은 따로 없다.
- Intercepted Routes는 URI와 상태가 연동되어, URI 변화에 따라 독립적인 상태 할당이 가능합니다.
- 결론: Parallel Routes는 여러 컴포넌트를 한 페이지에서 동시에 보여주고 싶을 때 주로 사용되며,
  Intercepted Routes는 URI에 따른 상태 변경이 필요한 경우에 더 적합합니다.

# private folder(\_폴더)

- uri영향x
- 공통인 컴포넌트 빼는법

# context api

# classnames(라이브러리)

1. cx(classnames라는 라이브러리)
2. 하나의 div가 클래스를 여러 개 가질 수 있는데, 그걸 조건부로 가질 수 있게.
3. cx라는 함수 안에 들어있는 전부를 다 기본적으로 랜더링 해주지만, 앞의 주어진 조건에 따른 배열 혹은 콤마로 나열 후 적용( 방법이 많음)

# useSelectedLayoutSegment

- 현재경로의 세그먼트를 알려주는 훅스
- 바로아래 자식이름까지만
- onst segment = useSelectedLayoutSegment();

# useSelectedLayoutSegments

- 자식의 자식 이름까지도 받고 싶을 경우
- onst segments = useSelectedLayoutSegments();

# usepathname

- 주소창 경로 확인하는법
- const pathname = usePathname();

# useSearchParams

서버컴포넌트는 클라이언트 자식일때 항상 props, children으로 보낸다.
onClickCapture
useRef

# onClickCapture

# MSV

env는 NEXT_PUBLIC리 붙으면 브라우저에서 접근가능
그렇기 때문에 유출이 되면 안되면 빼고써야함
env local을 쓰면 로컬에서는 env env.local 둘다 실행
->그냥 로컬에서는 env.local이 돌아간다고 생각하면 쉬움

# server action

# redirect

- redirect()는 try catch문안에서 사용하면 안됨
- redirect는 Next.js는 현재 실행 중인 모든 코드 흐름을 중단하고 즉시 리디렉션을 처리
- redirect는 호출 시 코드 흐름을 즉시 중단하고 리디렉션을 처리하므로, try-catch 블록 안에 있어도 catch로 넘어가지 않는다.
- redirect 호출 후 실행 흐름이 중단되므로, try 블록 내의 나머지 코드도 실행되지 않습니다.
- redirect는 서버 컴포넌트에서 실행: 실행환경이 서버측이기때문에
- replace 처럼 기록이 남지 않는다.

리액트쿼리핵심은 서버 데이터를 가지고오는것
리덕스의핵심은 데이터를 컴포넌트끼리 공유하는것, 공유를 하기위해서는 서버에서 데이터를 물론 가지고오긴해야함
캐싱관리(저장-재사용)이 중요
-> 리덕스는 캐싱이 약함
-> 인터페이스표준화(로딩,성공,실패)
디폴트가 모든데이터는 frash가 아니다. 그래서 직접설정해줘야함
frash: 최신
stale: 기회가되면 데이터를 가지고와라
inactive: 화면에서 쓰는거
--액션
refresh: 무조건새로 가져옴
invaildate: 옵저버(사용하고 있는 데이터)가 있을때 가져옴, 즉 데이터를 쓰고있을때 ,invaildate가 효율적임
그럼 무조건 invaildate가 낫다?
그건아님, 화면에 안보여도 쓰고있고, 매번 쓰여야할 데이터가 있을수도있다.
reset: 초기데이터가 있는경우에 초기데이터로 리셋, 없으면 그냥 리프래쉬
트리거 로딩, 에러로딩: 로딩상태, 에러상태 전환으로 확인

# react-query

- 인터페이스를 표준화(로딩,성공,실패)
- 키구조 시스템
- fresh: 최신상태이다.(모든 데이터는 fresh가 아니다가 기본)
- stale: 캐싱상태(기회가 되면 항상 가져온다)
- Inactive: 해당화면에서 키값을 쓰는지 안쓰는지
- fetching: 데이터가져올때
- paused: 데이터멈춰있을때
- action: 데이터 새로가져올수 있음(refetch(무조건),invalidate(옵저버가 1이 되는순간) 클릭)
  - 화면에 안보이는 데이터 새로고침시 refetch

# QueryClient()

- 캐싱,상태관리,네트워크 요청등을 총괄
- 전역적으로 설정하고 사용하기 위해
- prefetchQuery

# useQueryClient()

- 전역적으로 생성한 QueryClient에 접근해서 데이터 수정이나 캐시 업데이트 가능
- 데이터 강제 무효화, 데이터 프리패칭, 수동캐시 업데이트시 사용
- getQueryData
- prefetchInfiniteQuery

# useQuery

- 서버에서 데이터를 가지고오고, 캐싱 및 관리
- 캐시에 데이터가 있으면 캐시반환, 없으면 패칭요청
- 리액트 컴포넌트 내에서 랜더링과 요청수행

# useInfiniteQuery

- hasNextPage: 데이터를 다 불러왔을경우 false
-

- 페이지별로 따로관리
- 이차원배열형태 [[1,2,3,4,5],[6,7,8,9,10]..]
- getNextPageParam

# QueryFunction

# HydrationBoundary

- 서버 데이터를 클라이언트로 연결해주는 다리역할

# URLSearchParams

# css

- '> div'와 div 차이: 직계자식과 전체자식
- 부모자식간 width 100%를 설정하게 될경우 차이가 있을수도 있기때문에
  width: 'inherit'을 추천한다.
  background-size: contain;
  background-repeat: no-repeat;
  {user.Messages?.at(-1)?.content}
  display: inline-block;
  grid-template-rows: 1fr 1fr;
