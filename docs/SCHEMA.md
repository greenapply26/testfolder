# 📊 데이터베이스 스키마 설계 (DB Schema)

본 그룹바이(GroupBuy) 자동화 플랫폼의 핵심 데이터 구조입니다. 모든 테이블은 추적 가능성(Audit)을 위해 생성일(`created_at`)과 수정일(`updated_at`)을 포함합니다.

---

## 🚀 배포 및 인프라 (Infrastructure)
- **Database**: [Neon.tech](https://neon.tech/) (PostgreSQL-serverless)
- **Deployment**: [Vercel](https://vercel.com/) (Next.js 최적화 배포)
- **ORM**: Prisma 또는 Drizzle (Neon 서버리스 드라이버 지원)

---

## 1. 기업 정보 (Companies)
수집된 국내 스타트업 및 기업의 기본 데이터를 저장합니다.

| 컬럼명 | 타입 | 설명 |
|:---|:---|:---|
| `id` | UUID | 기본 키 (Primary Key) |
| `name` | String | 기업명 |
| `industry` | String | 산업 분야 (예: 핀테크, 커스텀 제조, SaaS) |
| `size` | Enum | 기업 규모 (1~10인, 11~50인, 50인 이상 등) |
| `investment_stage` | String | 투자 단계 (Seed, Pre-A, Series A, B 등) |
| `website_url` | String | 공식 웹사이트 주소 |
| `news_count` | Integer | 최근 3개월간 뉴스 기사 노출 빈도 |
| `score` | Float | 알고리즘기반 타겟팅 점수 |
| `tags` | Array | 기업 특징 태그 (예: #채용중, #투자유치성공) |

## 2. 리드 및 담당자 (Leads)
특정 기업 내의 잠재적인 접촉 대상자(개인) 정보를 관리합니다.

| 컬럼명 | 타입 | 설명 |
|:---|:---|:---|
| `id` | UUID | 기본 키 |
| `company_id` | UUID | 기업 테이블(Companies) 외래 키 |
| `name` | String | 담당자 성명 |
| `position` | String | 직위 (예: 인사팀장, 구매담당) |
| `email` | String | G-mail 연동 발송 대상 이메일 |
| `phone` | String | 연락처 (선택 사항) |
| `status` | Enum | 리드 상태 (발굴됨, 메일발송, 응답, 미팅예약, 취소) |
| `priority` | Enum | 우선순위 (Hot, Warm, Cold) |

## 3. 캠페인 (Campaigns)
메일 발송 전략 및 통합 성과를 관리하는 단위입니다.

| 컬럼명 | 타입 | 설명 |
|:---|:---|:---|
| `id` | UUID | 기본 키 |
| `title` | String | 캠페인 명칭 (예: 26년 상반기 그룹바이 제안) |
| `description` | Text | 캠페인 상세 설명 및 전략 |
| `is_active` | Boolean | 활성화 상태 여부 |
| `sent_count` | Integer | 총 발송 건수 |
| `open_count` | Integer | 총 메일 오픈 횟수 |
| `click_count` | Integer | 총 링크 클릭 횟수 |
| `template_id` | UUID | 사용된 메일 템플릿 ID |

## 4. 메일 발송 및 트래킹 (Emails)
개별적으로 발송된 이메일의 세부 내용과 상태를 기록합니다.

| 컬럼명 | 타입 | 설명 |
|:---|:---|:---|
| `id` | UUID | 기본 키 |
| `lead_id` | UUID | 리드 테이블(Leads) 외래 키 |
| `campaign_id` | UUID | 캠페인 테이블(Campaigns) 외래 키 |
| `subject` | String | 메일 제목 (AI로 개인화된 결과물) |
| `body` | Text | 메일 본문 |
| `sent_at` | DateTime | 실제 발송 시각 |
| `is_opened` | Boolean | 메일 열람 여부 |
| `opened_at` | DateTime | 마지막 열람 시각 |
| `response_received` | Boolean | 회신 수신 여부 |

## 5. CRM 히스토리 및 로그 (Interaction Logs)
기업/리드별 모든 대화 내역 및 메모를 타임라인으로 관리합니다.

| 컬럼명 | 타입 | 설명 |
|:---|:---|:---|
| `id` | UUID | 기본 키 |
| `lead_id` | UUID | 리드 테이블(Leads) 외래 키 |
| `type` | Enum | 로그 유형 (메모, 상태변경, 메일발송, 전화상담) |
| `content` | Text | 로그 내용 또는 작성된 메모 |
| `author_id` | UUID | 작성한 내부 팀원 ID |
| `created_at` | DateTime | 기록 일시 |

---

## 🏗️ ERD (Entity Relationship Diagram - 관계도)
1. **기업(Companies)** 1 : N **리드(Leads)**
2. **리드(Leads)** 1 : N **메일(Emails)**
3. **캠페인(Campaigns)** 1 : N **메일(Emails)**
4. **리드(Leads)** 1 : N **히스토리(Logs)**
