1.init

기본적으로는 src 바깥에 app폴더가 있으나,
주소와 관련된 파일은 app폴더에 넣고
관련없는 파일은 app폴더 바깥에 두자

nextConfig.js: next에 대한 설정

페이지를 전환하는데도 안바뀌는 부분은 레이아웃

페이지 전환시 {children}안에 페이지컴포넌트가 생성
즉 레이아웃이 페이지를 포함하고있다.

로그인했을때와 안했을때의 레이아웃이 다르다.

주소분석후 폴더만들기

[폴더명]: 변수에 담는거랑 비슷한 느낌임, 후순위
레이아웃을 그룹짓고 싶다면
(폴더명): ()안에있는 폴더명은 주소창에 관여를 안한다. ex)(home)/login => /login

페이지넘나들때 리렌더링,마운트 안되면 레이아웃(주로사용)
리렌더링 하고싶을때 템플릿.tsx(페이지넘나들때 기록해야할시, 구글애널리틱스 등)
공존하면안됨 둘중에 하나

Next는 a태그대신 Link를 사용 a태그는 페이지가 새로고침되기 때문, 리액트나 넥스트는 새로고침 유의

width: 100dvw;
height: 100dvh;
쓰면 페이지에서 주소창이 생기거나 사라지거나 그래도 전부주소창을 채우게 된다.

뒤에 화면이 남이있게 하면서 주소바뀌는법

페러랠라우트: @폴더명

- 페이지를 동시에 보여주는법, 폴더가 다르면 둘은 페러랠이 될수없다

인터셉팅라우팅: (..)폴더명

- 현재 레이아웃 내 애플리케이션의 다른 부분에서 경로를 로드할 수 있다.
- 사용자가 다른 컨텍스트로 전환하지 않고도 경로의 내용을 표시하려는 경우 유용하게 사용된다.
- 인터셉팅은 `(..)` 를 사용하여 정의할 수 있는데 이는 상대 경로(`/..` ) 규칙과 유사
- 클라이언트에서 라우팅시만 인터셉트 라우팅이 적용
  - 동작이나 이벤트 의해 발동하며, 직접주소입력이나 새로고침시에는 일반라우팅경로로 이동
  - 브라우저 내에서 사용자가 페이지 간 이동을 할 때만 인터셉트 라우팅이 발동된다는 의미예요.
  - 사용자가 링크를 클릭하거나 JavaScript 이벤트로 페이지 전환이 이루어질 때
  - 직접 URL 입력이나 새로고침 시: 사용자가 주소창에 특정 경로를 입력하거나 페이지를 새로고침할 때는
    서버에서 페이지를 다시 불러오고 라우팅을 결정하게 된다.
    이 경우는 클라이언트 내의 JavaScript 이벤트가 발동되지 않기 때문에 일반적인 라우터 경로가 적용
- `(.)` 동일한 수준 세그먼트와 일치
- `(..)` 한 수준 위 세그먼트와 일치
- `(..)(..)` 두 수준 위 세그먼트와 일치
- `(...)` 루트 app 디렉터리 세그먼트와 일치
- 서버에서 리다이렉트하면 인터셉팅이 제대로 되지않는다.
  이유는 서버리다이렉트같은경우 클라를 거치지 않고 바로 새로운경로로 이동되기 때문에 개입할수 없기때문
  그래서 리다이렉트대신 useRouter등으로 한다.
  push랑 replace는 이동하는건 비슷하나. 뒤로가기시에 다른점이있다.
  전자는 전페이지 이동이나 후자는 처음화면으로 이동(후자는 히스토리가 안남음)

패러럴 vs 인터셉팅 차이

- Parallel Routes는 한 페이지에서 여러 섹션을 동시에 렌더링하는 기능일 뿐, 각 URI에 맞는 새로운 상태를 독립적으로 할당하지 않습니다. 그래서 Parallel Routes로 구현할 경우, 모든 섹션이 하나의 URI에 종속되고, URL에 맞춰 각 섹션의 상태가 새롭게 할당되거나 변경되는 방식이 아닙니다.

- 즉, Parallel Routes는 지정된 레이아웃 내에서 여러 컴포넌트를 평행하게 배치하는 것이기 때문에, URI 변경에 따라 개별 상태를 새로 할당하거나 리셋하는 기능은 따로 없습니다. 이와 반대로 Intercepted Routes는 URI와 상태가 연동되어, URI 변화에 따라 독립적인 상태 할당이 가능합니다.

- Parallel Routes는 여러 컴포넌트를 한 페이지에서 동시에 보여주고 싶을 때 주로 사용되며, Intercepted Routes는 URI에 따른 상태 변경이 필요한 경우에 더 적합합니다.

css

- '> div'와 div 차이: 직계자식과 전체자식
- 부모자식간 width 100%를 설정하게 될경우 차이가 있을수도 있기때문에
  width: 'inherit'을 추천한다.
