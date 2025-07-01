# 🪙 코인 모의 투자 서비스 by Lovable

## 페르소나

### 심심한 사람 - 성민제 (26세)

- 직업: 학생
- 라이프스타일: 수업이 있을 때 나감, 공강 시간에 친구들과 시간을 보냄, 강의가 없을 때 심심함
- 목표: 붕 뜨는 시간에 친구들과 할 만한 컨텐츠가 필요함, 코인(대표적으로 비트코인, 이더리움, 도지코인)의 실시간 그래프를 가지고 일정 시간(3분, 5분)동안 모의투자를 해서 가장 높은 수익을 얻어온 사람을 겨루는 컨텐츠가 필요함
- 니즈: 코인 모의 투자, 친구들과 수익 승부
- 페인 포인트: 심심함, 따분함

## 사용자 시나리오 및 스토리

### 심심한 대학생의 공강 시간

상황: 성민제가 공강 시간에 할 게 없어 친구들과 같이 모의투자로 커피내기를 하는 상황

사용자 시나리오:

1. 스마트폰에서 코인투자 대결 웹 접속
2. 제한 시간(3분 / 5분) 설정 후 모의투자 시작
3. 제한 시간동안 실시간 코인 종목 그래프를 바탕으로 매수/매도를 하여 초기 자본(10000원)을 변화시킴
4. 제한 시간이 끝나고 가장 낮은 수익을 번 사람이 나머지 사람에게 커피를 얻어먹음
5. 성민제의 경우 아슬아슬하게 꼴등을 벗어나 커피를 얻어마심

사용자 스토리:

> "심심할 때 모의투자를 통해 친구들과 대결할 수 있는 웹 서비스가 필요합니다. 그래서 코인 모의투자를 통해 친구들과 즐거운 시간을 보낼 수 있습니다."

인수 조건:

- Given: 사용자가 코인투자 대결 웹에 접속했을 때
- When: 제한시간을 정하고 코인 모의투자를 시작했을 때
- Then: 제한시간이 끝나고 실시간 코인정보를 바탕으로 초기 자본을 늘려 수익률을 비교할 수 있다.

## 핵심 가치 제안

1. 무료함 해결: 제한된 시간안에 수익을 높이기 위해 경쟁함으로써 심심한 시간을 친구들과 놀 수 있음
2. 모의 투자: 실제 돈을 사용하지 않고 가상 자본을 사용하여 오로지 수익률을 비교하기 위한 놀이로 활용

## 핵심 기능

- 실시간 코인 정보를 바탕으로 모의투자를 하여 가상 자본을 제한 시간동안 늘릴 수 있는 시뮬레이터
- 예시: 제한시간 3분 선택 → 모의 투자 시작 → 실제 코인 그래프 및 정보가 제공되는 종목이 3개정도 표시됨 → 초기 자본은 10000원으로 제공됨 → 제한시간동안 가지고 있는 자본으로 해당 종목에 매수/매도 → 매수/매도하는 금액을 슬라이더 혹은 직접 입력으로 입력 → 제한 시간이 끝난 뒤 결과(자본 상태, 수익률)을 표시
- 제한시간이 걸려있는 모의 코인투자 시뮬레이터

## 구현 범위

- 실제 API 연동 없이 목업(Mocking) 데이터로 구현
- 모의투자 전 기본 세팅(제한시간)을 지정하고 제한시간동안 가상으로 매수/매도 할 수 있는 프로토타입 수준
- 사용자 입력에 따라 모의 코인투자 데이터를 반영해 수익률 계산

## Project info

**URL**: https://lovable.dev/projects/525f986a-eb59-4ff2-a5ae-079386dee738

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/525f986a-eb59-4ff2-a5ae-079386dee738) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/525f986a-eb59-4ff2-a5ae-079386dee738) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
