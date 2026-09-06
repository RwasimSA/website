/* أعضاء الفريق — يُجلبون حيّاً من GET /team?group={slug}.
   المجموعات: board-of-directors · executive-management · general-assembly · branch-managers */

/** تحويل عضو من شكل الـ API إلى شكل بطاقات الواجهة. */
export const mapApiTeam = (list) => (list || []).map((m) => ({
  name: m.name,
  role: m.role,
  lead: !!m.is_lead,
  src: m.photo || undefined,     // MemberPhoto يعرض الأحرف الأولى عند الغياب
  email: m.email || undefined,
}))
