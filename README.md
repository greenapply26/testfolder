# 🚀 GroupBuy Automation & CRM Platform

기업 데이터를 분석하여 최적의 제안 시점을 포착하고, Gmail을 통해 자동화된 맞춤형 메일링과 세일즈 파이프라인(CRM)을 관리하는 솔루션입니다.

## 📁 주요 문서
- [PRD (기존 요구사항 및 상세 기획)](./docs/PRD.md)

## ✨ 핵심 인터페이스 (주요 탭 구성)
1. **🔍 기업 발굴 및 추출**: 타겟 기업을 검색하고 목록을 관리합니다.
2. **👤 담당자 정보 탐색**: 도메인 기반 패턴 분석 및 외부 API 연동을 통해 담당자 이메일을 발굴합니다.
3. **✍️ 맞춤형 이메일 생성**: 수집된 기업 데이터를 기반으로 AI가 1:1 개인화 메일을 작성합니다.
4. **📊 발송 및 추적**: Gmail API 연동 발송 및 실시간 오픈/응답률 대시보드를 제공합니다.

## 📈 SEO 최적화 설계
- 프로젝트 전반에 **Semantic HTML**을 적용하여 검색 엔진 노출을 극대화합니다.
- 기업별 통계 및 인사이트 페이지를 동적으로 생성하여 롱테일 키워드 유입을 유도합니다.

## 🛠 기술 스택
- **Frontend**: Next.js (TypeScript, TailwindCSS)
- **Backend/ORM**: Prisma (Neon PostgreSQL 연동 완료)
- **Deployment**: Vercel (연동 예정)
- **AI**: GPT-4 (AI Personalization)

## 📁 데이터베이스 구조
- **Neon Cloud** 서버리스 환경에 [Prisma Schema](./prisma/schema.prisma)가 동기화되어 있습니다.

## 📅 4일 개발 로드맵
- **Day 1**: 기획 및 구조 설계 (DB, 아키텍처)
- **Day 2**: UI/UX 디자인 및 FE 초안
- **Day 3**: 기능 개발 (BE, Gmail 연동)
- **Day 4**: 통합, 테스트 및 배포 준비
