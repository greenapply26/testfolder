# 서비스 기획서 (PRD): 기업 대상 그룹바이(GroupBuy) 자동화 플랫폼

## 1. 프로젝트 개요 (Overview)
본 프로젝트는 국내 스타트업 및 기업 데이터를 기반으로 가치가 높은 잠재 고객사(Lead)를 발굴하고, 맞춤형 그룹바이(GroupBuy) 제안서를 G-mail API를 통해 자동 발송하며, 리드 상태를 CRM 형태로 관리하는 통합 세일즈 자동화 플랫폼 구축을 목표로 합니다.

- **프로젝트 명**: 그룹바이 세일즈 자동화 플랫폼 (GroupBuy Sales Intelligence)
- **핵심 목표**: "기업 발굴 → 맞춤형 메일링 → 성과 분석 → CRM 관리"라는 영업 전 과정을 일원화하여 세일즈 효율을 극대화함.
- **참고 모델(Reference)**: [Outcome](https://www.outcome.co.kr/) (UI/UX 및 사이트 구조 참고)
- **데이터베이스 설계**: [데이터베이스 스키마(SCHEMA.md)](./SCHEMA.md) 참고

---

## 2. 핵심 UI/UX 설계 (주요 탭 구성)
사용자가 가장 직관적으로 업무를 수행할 수 있도록 다음 4가지 핵심 탭 위주로 플랫폼을 설계합니다.

### Tab 1: [기업 발굴 및 추출] (Discovery & Extraction)
- **기능**: 산업군, 규모, 투자단계 등으로 필터링하여 잠재 고객사가 될 기업 목록을 추출합니다.
- **핵심 요소**: 다중 필터 검색, 기업 상세 정보(뉴스, 투자), 관심 기업 저장(Bookmark).

### Tab 2: [담당자 정보 발굴] (Lead Enrichment)
- **기능**: 추출한 기업의 담당자(HR, 구매팀, 대표 등) 성함과 이메일 주소를 역추적하여 알아냅니다.
- **핵심 요소**: 도메인 기반 이메일 패턴 분석, 외부 데이터 API 연동, 담당자 직무 필터링.

### Tab 3: [맞춤형 이메일 생성] (AI Personalization)
- **기능**: 기업 정보(최신 뉴스, 업종 특성)를 AI가 분석하여 해당 기업만을 위한 개인화된 이메일 초안을 생성합니다.
- **핵심 요소**: AI 프롬프트 템플릿, 기업별 커스텀 필드 자동 삽입, 메일 톤앤매너 조절.

### Tab 4: [발송 및 관리 Dashboard] (Sending & Tracking)
- **기능**: Gmail API를 통해 생성된 메일을 실제 담당자에게 발송하고, 오픈/응답 여부를 실시간으로 추적합니다.
- **핵심 요소**: Gmail 계정 연동, 대량 발송 상태 확인, CRM 기반 리드 상태 관리(Hot/Warm/Cold).

---

## 3. SEO(검색 엔진 최적화) 전략
B2B 서비스로서의 가시성을 높이기 위해 다음의 SEO 최적화 설계를 병행합니다.

1. **상세 페이지 구조화**: 각 업종별/분야별 기업 리스트 테마를 landing page로 노출 (예: '2024 주목받는 핀테크 스타트업 메일링 전략').
2. **Semantic HTML 적용**: `<h1>`, `<h2>` 태그를 활용한 키워드(기업 메일링 자동화, B2B 영업 툴) 배치.
3. **고유 URL 체계**: 각 캠페인이나 공개 리포트 페이지에 대한 검색 로봇 허용 및 메타 태그 최적화.
4. **성능 최적화**: Core Web Vitals 점수 확보를 위한 빠른 페이지 로딩 (Vite/Next.js 활용).

### 3.3 캠페인 및 통합 대시보드
- **성과 시각화**: 캠페인별 메일 발송 수, 오픈율(OR), 응답률(RR), 미팅 전환율 시각화.
- **리드 관리(CRM)**: 
  - 기업별 대화 이력(Timeline) 관리.
  - 태그(Hot, Warm, Cold) 시스템 및 담당자 지정.
  - 칸반 보드 스타일의 세일즈 파이프라인 시각화.

### 3.4 제안서 자동화
- **그룹바이 제안서 생성**: PDF 또는 웹 기반의 인터랙티브 제안서 자동 생성 및 링크 첨부.
- **Follow-up 자동화**: 특정 기간 내 응답이 없을 경우 2차, 3차 Follow-up 메일 자동 예약 발송.

---

## 4. 기술 아키텍처 (Technical Architecture)
- **Frontend**: Vite + React / Next.js (Outcome 스타일의 인터랙션 및 애니메이션 적용).
- **Backend**: Node.js / Python (FastAPI).
- **Database**: PostgreSQL (리드 및 캠페인 데이터), Redis (상태 트래킹).
- **AI Module**: GPT-4 등 LLM을 활용한 메일 개인화 및 기업 데이터 요약.
- **External APIs**: Gmail API, Google Workspace Discovery APIs, Data sources (JobPlanet, etc.).

---

## 5. UI/UX 디자인 원칙 (Design Principles)
- **Reference**: [Outcome](https://www.outcome.co.kr/)
- **Visuals**: Clean, Minimal, Slate/Dark 모드 기반의 고급스러운 디자인.
- **Interactions**: 데이터 로딩 시 부드러운 스켈레톤 UI, 차트 애니메이션, 상태 변화에 따른 피드백 강조.
- **Accessibility**: 대량의 리드 데이터를 효율적으로 관리할 수 있는 테이블 뷰와 상세 뷰의 조화.

---

## 6. 개발 일정 (4-Day Sprint)

| 일차 | 단계 | 세부 과업 |
|:---:|:---:|---|
| **Day 1** | **기획 및 설계** | 요구사항 확정, DB 스키마 설계, 시스템 아키텍처 및 API 명세서 작성 |
| **Day 2** | **UI/UX & FE** | 디자인 시스템(Colot, Typo) 구축, Outcome 스타일 핵심 UI(대시보드, 리드 리스트) 초안 |
| **Day 3** | **BE & API** | Gmail 연동 모듈 개발, 기업 발굴 알고리즘 프로토타입, 데이터 수집 파이프라인 구축 |
| **Day 4** | **통합 및 검수** | 기능 통합 테스트, AI 개인화 튜닝, 최종 배포 버전 정리 및 피드백 반영 |

---

## 7. 향후 확장성 (Future Scalability)
- **다채널 연동**: LinkedIn Message, Slack Notification, Naver Works 연동 모듈 추가.
- **팀 협업**: 여러 사용자가 하나의 파이프라인을 공유하는 팀 대시보드 강화.
- **자동 결제**: 그룹바이 수락 시 바로 결제 또는 계약 체결로 이어지는 전자계약 모듈 연동.
