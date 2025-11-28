module.exports = [
"[project]/components/status-badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatusBadge",
    ()=>StatusBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
function StatusBadge({ status, variant }) {
    const getStatusColor = (status)=>{
        const lower = status?.toLowerCase() || "";
        if (lower.includes("pending") || lower.includes("review")) {
            return "bg-warning/20 text-warning-foreground hover:bg-warning/30 border-warning/30";
        }
        if (lower.includes("approved") || lower.includes("active") || lower.includes("delivered") || lower.includes("closed")) {
            return "bg-success/20 text-success-foreground hover:bg-success/30 border-success/30";
        }
        if (lower.includes("rejected") || lower.includes("overdue") || lower.includes("critical") || lower.includes("high")) {
            return "bg-destructive/20 text-destructive hover:bg-destructive/30 border-destructive/30";
        }
        if (lower.includes("medium") || lower.includes("evaluation") || lower.includes("open")) {
            return "bg-info/20 text-info-foreground hover:bg-info/30 border-info/30";
        }
        return "bg-muted text-muted-foreground hover:bg-muted/80";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
        variant: variant || "secondary",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("font-normal", getStatusColor(status)),
        children: status
    }, void 0, false, {
        fileName: "[project]/components/status-badge.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/actions/data:9e375e [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40f25c9448fb0c5a0c4bd6e6f0e64d26543287adad":"submitCompanyOnboarding"},"lib/actions/onboarding-actions.ts",""] */ __turbopack_context__.s([
    "submitCompanyOnboarding",
    ()=>submitCompanyOnboarding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var submitCompanyOnboarding = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("40f25c9448fb0c5a0c4bd6e6f0e64d26543287adad", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "submitCompanyOnboarding"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vb25ib2FyZGluZy1hY3Rpb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc2VydmVyJ1xuXG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gJ25leHQvY2FjaGUnXG5pbXBvcnQgeyBhdXRoLCBjbGVya0NsaWVudCB9IGZyb20gJ0BjbGVyay9uZXh0anMvc2VydmVyJ1xuaW1wb3J0IGRiQ29ubmVjdCBmcm9tICdAL2xpYi9tb25nb2RiJ1xuaW1wb3J0IHsgU3VwcGxpZXIgfSBmcm9tICcuLi9tb2RlbHMvU3VwcGxpZXInXG5pbXBvcnQgeyBDb21wYW55IH0gZnJvbSAnLi4vbW9kZWxzL0NvbXBhbnknXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdWJtaXRDb21wYW55T25ib2FyZGluZyhkYXRhOiB7XG4gIGNvbXBhbnlOYW1lOiBzdHJpbmdcbiAgaW5kdXN0cnk/OiBzdHJpbmdcbiAgcmVnaW9uPzogc3RyaW5nXG4gIHNpemU/OiBzdHJpbmdcbiAgY29udGFjdEVtYWlsPzogc3RyaW5nXG4gIG9yZ2FuaXphdGlvblR5cGU/OiBzdHJpbmdcbiAgYWRkcmVzcz86IHN0cmluZ1xuICBvZmZpY2lhbEVtYWlsPzogc3RyaW5nXG4gIGNvbXBhbnlQaG9uZT86IHN0cmluZ1xuICB3ZWJzaXRlPzogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb25OYW1lPzogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb25Sb2xlPzogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb25QaG9uZT86IHN0cmluZ1xuICBjb250YWN0UGVyc29uRW1haWw/OiBzdHJpbmdcbiAgYnVzaW5lc3NEZXNjcmlwdGlvbj86IHN0cmluZ1xuICBoYXNCcmFuY2hlcz86IGJvb2xlYW5cbiAgbnVtYmVyT2ZCcmFuY2hlcz86IG51bWJlclxuICBicmFuY2hMb2NhdGlvbnM/OiBzdHJpbmdcbiAgY2VudHJhbFN0b3JlPzogc3RyaW5nXG4gIHByb2N1cmVtZW50TWV0aG9kPzogc3RyaW5nXG4gIHJlcXVpcmVzQXBwcm92YWxXb3JrZmxvd3M/OiBib29sZWFuXG4gIGFwcHJvdmFsTGV2ZWxzPzogc3RyaW5nW11cbiAgbWFuYWdlck5hbWU/OiBzdHJpbmdcbiAgbWFuYWdlclBvc2l0aW9uPzogc3RyaW5nXG4gIG1hbmFnZXJFbWFpbD86IHN0cmluZ1xuICBlbXBsb3llZUFjY2Vzc0NvdW50Pzogc3RyaW5nXG4gIGRlcGFydG1lbnRzPzogc3RyaW5nW11cbiAgb3RoZXJEZXBhcnRtZW50Pzogc3RyaW5nXG4gIHJlZ2lzdHJhdGlvblVwbG9hZHM/OiB7IG5hbWU6IHN0cmluZzsgc2l6ZTogbnVtYmVyOyB0eXBlOiBzdHJpbmcgfVtdXG4gIHRpbj86IHN0cmluZ1xuICBsb2dvVXBsb2Fkcz86IHsgbmFtZTogc3RyaW5nOyBzaXplOiBudW1iZXI7IHR5cGU6IHN0cmluZyB9W11cbiAgdmVuZG9yc1NlbGZPbmJvYXJkPzogc3RyaW5nXG4gIHRlbmRlcmluZ0VuYWJsZWQ/OiBib29sZWFuXG4gIGVJbnZvaWNpbmdFbmFibGVkPzogYm9vbGVhblxuICBhbmFseXRpY3NFbmFibGVkPzogYm9vbGVhblxuICBzeXN0ZW1NYW5hZ2VyTmFtZT86IHN0cmluZ1xuICBzeXN0ZW1NYW5hZ2VyUm9sZT86IHN0cmluZ1xuICBpbnZvaWNlc0FwcHJvdmVyPzogc3RyaW5nXG4gIHBvQXBwcm92ZXI/OiBzdHJpbmdcbiAgZ29vZHNSZWNlaXZlcj86IHN0cmluZ1xuICBwcm9qZWN0TGVhZD86IHN0cmluZ1xuICB0cmFpbmluZ09mZmljZXI/OiBzdHJpbmdcbiAgZGVjbGFyYXRpb25JbmZvQWNjdXJhdGU/OiBib29sZWFuXG4gIGRlY2xhcmF0aW9uQWdyZWVPbmJvYXJkaW5nPzogYm9vbGVhblxufSkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdXNlcklkIH0gPSBhd2FpdCBhdXRoKClcbiAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVW5hdXRob3JpemVkJyB9XG4gICAgfVxuXG4gICAgYXdhaXQgZGJDb25uZWN0KClcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IENvbXBhbnkuY291bnREb2N1bWVudHMoKVxuICAgIGNvbnN0IGNvbXBhbnlJZCA9IGBDT01QLSR7KGNvdW50ICsgMTAwMCkudG9TdHJpbmcoKX1gXG5cbiAgICBhd2FpdCBDb21wYW55LmNyZWF0ZSh7XG4gICAgICBjb21wYW55SWQsXG4gICAgICBuYW1lOiBkYXRhLmNvbXBhbnlOYW1lLFxuICAgICAgYXBwcm92ZWQ6IGZhbHNlLFxuICAgICAgaW5kdXN0cnk6IGRhdGEuaW5kdXN0cnkgfHwgJycsXG4gICAgICByZWdpb246IGRhdGEucmVnaW9uIHx8ICcnLFxuICAgICAgc2l6ZTogZGF0YS5zaXplIHx8ICcnLFxuICAgICAgY29udGFjdEVtYWlsOiBkYXRhLmNvbnRhY3RFbWFpbCB8fCAnJyxcbiAgICAgIG93bmVyVXNlcklkOiB1c2VySWQsXG4gICAgICBvbmJvYXJkaW5nOiB7XG4gICAgICAgIGNvbXBhbnlJbmZvcm1hdGlvbjoge1xuICAgICAgICAgIG9yZ2FuaXphdGlvblR5cGU6IGRhdGEub3JnYW5pemF0aW9uVHlwZSB8fCAnJyxcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MgfHwgJycsXG4gICAgICAgICAgb2ZmaWNpYWxFbWFpbDogZGF0YS5vZmZpY2lhbEVtYWlsIHx8ICcnLFxuICAgICAgICAgIHBob25lOiBkYXRhLmNvbXBhbnlQaG9uZSB8fCAnJyxcbiAgICAgICAgICB3ZWJzaXRlOiBkYXRhLndlYnNpdGUgfHwgJycsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRhY3RQZXJzb246IHtcbiAgICAgICAgICBuYW1lOiBkYXRhLmNvbnRhY3RQZXJzb25OYW1lIHx8ICcnLFxuICAgICAgICAgIHJvbGU6IGRhdGEuY29udGFjdFBlcnNvblJvbGUgfHwgJycsXG4gICAgICAgICAgcGhvbmU6IGRhdGEuY29udGFjdFBlcnNvblBob25lIHx8ICcnLFxuICAgICAgICAgIGVtYWlsOiBkYXRhLmNvbnRhY3RQZXJzb25FbWFpbCB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgYnVzaW5lc3NPcGVyYXRpb25zOiB7XG4gICAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuYnVzaW5lc3NEZXNjcmlwdGlvbiB8fCAnJyxcbiAgICAgICAgICBoYXNCcmFuY2hlczogQm9vbGVhbihkYXRhLmhhc0JyYW5jaGVzKSxcbiAgICAgICAgICBudW1iZXJPZkJyYW5jaGVzOiB0eXBlb2YgZGF0YS5udW1iZXJPZkJyYW5jaGVzID09PSAnbnVtYmVyJyA/IGRhdGEubnVtYmVyT2ZCcmFuY2hlcyA6IDAsXG4gICAgICAgICAgYnJhbmNoTG9jYXRpb25zOiBkYXRhLmJyYW5jaExvY2F0aW9ucyB8fCAnJyxcbiAgICAgICAgICBjZW50cmFsU3RvcmU6IGRhdGEuY2VudHJhbFN0b3JlIHx8ICcnLFxuICAgICAgICB9LFxuICAgICAgICBwcm9jdXJlbWVudFN0cnVjdHVyZToge1xuICAgICAgICAgIGN1cnJlbnRNZXRob2Q6IGRhdGEucHJvY3VyZW1lbnRNZXRob2QgfHwgJycsXG4gICAgICAgICAgcmVxdWlyZXNBcHByb3ZhbFdvcmtmbG93czogQm9vbGVhbihkYXRhLnJlcXVpcmVzQXBwcm92YWxXb3JrZmxvd3MpLFxuICAgICAgICAgIGFwcHJvdmFsTGV2ZWxzOiBBcnJheS5pc0FycmF5KGRhdGEuYXBwcm92YWxMZXZlbHMpID8gZGF0YS5hcHByb3ZhbExldmVscyA6IFtdLFxuICAgICAgICAgIG1hbmFnZXI6IHtcbiAgICAgICAgICAgIG5hbWU6IGRhdGEubWFuYWdlck5hbWUgfHwgJycsXG4gICAgICAgICAgICBwb3NpdGlvbjogZGF0YS5tYW5hZ2VyUG9zaXRpb24gfHwgJycsXG4gICAgICAgICAgICBlbWFpbDogZGF0YS5tYW5hZ2VyRW1haWwgfHwgJycsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgdXNlclNldHVwOiB7XG4gICAgICAgICAgZW1wbG95ZWVBY2Nlc3NDb3VudDogZGF0YS5lbXBsb3llZUFjY2Vzc0NvdW50IHx8ICcnLFxuICAgICAgICAgIGRlcGFydG1lbnRzOiBBcnJheS5pc0FycmF5KGRhdGEuZGVwYXJ0bWVudHMpID8gZGF0YS5kZXBhcnRtZW50cyA6IFtdLFxuICAgICAgICAgIG90aGVyRGVwYXJ0bWVudDogZGF0YS5vdGhlckRlcGFydG1lbnQgfHwgJycsXG4gICAgICAgIH0sXG4gICAgICAgIGRvY3VtZW50czoge1xuICAgICAgICAgIHJlZ2lzdHJhdGlvblVwbG9hZHM6IEFycmF5LmlzQXJyYXkoZGF0YS5yZWdpc3RyYXRpb25VcGxvYWRzKSA/IGRhdGEucmVnaXN0cmF0aW9uVXBsb2FkcyA6IFtdLFxuICAgICAgICAgIHRpbjogZGF0YS50aW4gfHwgJycsXG4gICAgICAgICAgbG9nb1VwbG9hZHM6IEFycmF5LmlzQXJyYXkoZGF0YS5sb2dvVXBsb2FkcykgPyBkYXRhLmxvZ29VcGxvYWRzIDogW10sXG4gICAgICAgIH0sXG4gICAgICAgIHN5c3RlbUNvbmZpZ3VyYXRpb246IHtcbiAgICAgICAgICB2ZW5kb3JzU2VsZk9uYm9hcmQ6IGRhdGEudmVuZG9yc1NlbGZPbmJvYXJkIHx8ICcnLFxuICAgICAgICAgIHRlbmRlcmluZ0VuYWJsZWQ6IEJvb2xlYW4oZGF0YS50ZW5kZXJpbmdFbmFibGVkKSxcbiAgICAgICAgICBlSW52b2ljaW5nRW5hYmxlZDogQm9vbGVhbihkYXRhLmVJbnZvaWNpbmdFbmFibGVkKSxcbiAgICAgICAgICBhbmFseXRpY3NFbmFibGVkOiBCb29sZWFuKGRhdGEuYW5hbHl0aWNzRW5hYmxlZCksXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3BvbnNpYmlsaXRpZXM6IHtcbiAgICAgICAgICBzeXN0ZW1NYW5hZ2VyTmFtZTogZGF0YS5zeXN0ZW1NYW5hZ2VyTmFtZSB8fCAnJyxcbiAgICAgICAgICBzeXN0ZW1NYW5hZ2VyUm9sZTogZGF0YS5zeXN0ZW1NYW5hZ2VyUm9sZSB8fCAnJyxcbiAgICAgICAgICBpbnZvaWNlc0FwcHJvdmVyOiBkYXRhLmludm9pY2VzQXBwcm92ZXIgfHwgJycsXG4gICAgICAgICAgcG9BcHByb3ZlcjogZGF0YS5wb0FwcHJvdmVyIHx8ICcnLFxuICAgICAgICAgIGdvb2RzUmVjZWl2ZXI6IGRhdGEuZ29vZHNSZWNlaXZlciB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgdGVhbU1lbWJlcnM6IHtcbiAgICAgICAgICBwcm9qZWN0TGVhZDogZGF0YS5wcm9qZWN0TGVhZCB8fCAnJyxcbiAgICAgICAgICB0cmFpbmluZ09mZmljZXI6IGRhdGEudHJhaW5pbmdPZmZpY2VyIHx8ICcnLFxuICAgICAgICB9LFxuICAgICAgICBkZWNsYXJhdGlvbnM6IHtcbiAgICAgICAgICBpbmZvQWNjdXJhdGU6IEJvb2xlYW4oZGF0YS5kZWNsYXJhdGlvbkluZm9BY2N1cmF0ZSksXG4gICAgICAgICAgYWdyZWVPbmJvYXJkaW5nOiBCb29sZWFuKGRhdGEuZGVjbGFyYXRpb25BZ3JlZU9uYm9hcmRpbmcpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgY2xlcmtDbGllbnQoKVxuICAgIGF3YWl0IGNsaWVudC51c2Vycy51cGRhdGVVc2VyKHVzZXJJZCwge1xuICAgICAgcHVibGljTWV0YWRhdGE6IHtcbiAgICAgICAgcm9sZTogJ2NvbXBhbnknLFxuICAgICAgICBjb21wYW55SWQsXG4gICAgICAgIG9uYm9hcmRpbmdTdGF0dXM6ICdwZW5kaW5nX2FkbWluX2FwcHJvdmFsJyxcbiAgICAgICAgY29tcGFueToge1xuICAgICAgICAgIG5hbWU6IGRhdGEuY29tcGFueU5hbWUsXG4gICAgICAgICAgaW5kdXN0cnk6IGRhdGEuaW5kdXN0cnkgfHwgJycsXG4gICAgICAgICAgcmVnaW9uOiBkYXRhLnJlZ2lvbiB8fCAnJyxcbiAgICAgICAgICBzaXplOiBkYXRhLnNpemUgfHwgJycsXG4gICAgICAgICAgY29udGFjdEVtYWlsOiBkYXRhLmNvbnRhY3RFbWFpbCB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgb25ib2FyZGVkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIHJldmFsaWRhdGVQYXRoKCcvb25ib2FyZGluZycpXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogeyBjb21wYW55SWQgfSB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRmFpbGVkIHRvIHN1Ym1pdCBjb21wYW55IG9uYm9hcmRpbmcnIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3VibWl0U3VwcGxpZXJPbmJvYXJkaW5nKGRhdGE6IHtcbiAgbmFtZTogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb24/OiBzdHJpbmdcbiAgcGhvbmU/OiBzdHJpbmdcbiAgZW1haWw/OiBzdHJpbmdcbiAgZ29vZHNUeXBlPzogc3RyaW5nXG4gIHByb2R1Y3RDYXRlZ29yaWVzPzogc3RyaW5nW11cbiAgc3VwcGx5QXJlYXM/OiBzdHJpbmdbXVxuICBkZWxpdmVyeVRpbWVsaW5lPzogc3RyaW5nXG4gIHByaWNlTGlzdFVwbG9hZHM/OiB7IG5hbWU6IHN0cmluZzsgc2l6ZTogbnVtYmVyOyB0eXBlOiBzdHJpbmcgfVtdXG4gIHJlZ2lzdHJhdGlvbkNlcnRpZmljYXRlVXBsb2Fkcz86IHsgbmFtZTogc3RyaW5nOyBzaXplOiBudW1iZXI7IHR5cGU6IHN0cmluZyB9W11cbiAgYmFua0RldGFpbHM/OiB7IGJhbmtOYW1lPzogc3RyaW5nOyBhY2NvdW50TmFtZT86IHN0cmluZzsgYWNjb3VudE51bWJlcj86IHN0cmluZzsgcHJlZmVyc0Nhc2g/OiBib29sZWFuIH1cbiAgZGVjbGFyYXRpb25zPzogeyBpbmZvQWNjdXJhdGU/OiBib29sZWFuOyBhZ3JlZVJ1bGVzPzogYm9vbGVhbiB9XG4gIGNhdGVnb3J5Pzogc3RyaW5nXG4gIHJlZ2lvbj86IHN0cmluZ1xuICBzZWdtZW50Pzogc3RyaW5nXG59KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyB1c2VySWQgfSA9IGF3YWl0IGF1dGgoKVxuICAgIGlmICghdXNlcklkKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH1cbiAgICBhd2FpdCBkYkNvbm5lY3QoKVxuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgU3VwcGxpZXIuY291bnREb2N1bWVudHMoKVxuICAgIGNvbnN0IHN1cHBsaWVySWQgPSBgU1VQLSR7KGNvdW50ICsgNTAwMCkudG9TdHJpbmcoKX1gXG4gICAgY29uc3Qgc3VwcGxpZXIgPSBhd2FpdCBTdXBwbGllci5jcmVhdGUoe1xuICAgICAgc3VwcGxpZXJJZCxcbiAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgIGFwcHJvdmVkOiBmYWxzZSxcbiAgICAgIG93bmVyVXNlcklkOiB1c2VySWQsXG4gICAgICBjYXRlZ29yeTogZGF0YS5jYXRlZ29yeSB8fCAnR2VuZXJhbCcsXG4gICAgICByZWdpb246IGRhdGEucmVnaW9uIHx8ICdHbG9iYWwnLFxuICAgICAgc2VnbWVudDogZGF0YS5zZWdtZW50IHx8ICdTdGFuZGFyZCcsXG4gICAgICBvbmJvYXJkaW5nOiB7XG4gICAgICAgIGNvbnRhY3RQZXJzb246IGRhdGEuY29udGFjdFBlcnNvbiB8fCAnJyxcbiAgICAgICAgcGhvbmU6IGRhdGEucGhvbmUgfHwgJycsXG4gICAgICAgIGVtYWlsOiBkYXRhLmVtYWlsIHx8ICcnLFxuICAgICAgICBnb29kc1R5cGU6IGRhdGEuZ29vZHNUeXBlIHx8ICcnLFxuICAgICAgICBwcm9kdWN0Q2F0ZWdvcmllczogQXJyYXkuaXNBcnJheShkYXRhLnByb2R1Y3RDYXRlZ29yaWVzKSA/IGRhdGEucHJvZHVjdENhdGVnb3JpZXMgOiBbXSxcbiAgICAgICAgc3VwcGx5QXJlYXM6IEFycmF5LmlzQXJyYXkoZGF0YS5zdXBwbHlBcmVhcykgPyBkYXRhLnN1cHBseUFyZWFzIDogW10sXG4gICAgICAgIGRlbGl2ZXJ5VGltZWxpbmU6IGRhdGEuZGVsaXZlcnlUaW1lbGluZSB8fCAnJyxcbiAgICAgICAgcHJpY2VMaXN0VXBsb2FkczogQXJyYXkuaXNBcnJheShkYXRhLnByaWNlTGlzdFVwbG9hZHMpID8gZGF0YS5wcmljZUxpc3RVcGxvYWRzIDogW10sXG4gICAgICAgIHJlZ2lzdHJhdGlvbkNlcnRpZmljYXRlVXBsb2FkczogQXJyYXkuaXNBcnJheShkYXRhLnJlZ2lzdHJhdGlvbkNlcnRpZmljYXRlVXBsb2FkcykgPyBkYXRhLnJlZ2lzdHJhdGlvbkNlcnRpZmljYXRlVXBsb2FkcyA6IFtdLFxuICAgICAgICBiYW5rRGV0YWlsczoge1xuICAgICAgICAgIGJhbmtOYW1lOiBkYXRhLmJhbmtEZXRhaWxzPy5iYW5rTmFtZSB8fCAnJyxcbiAgICAgICAgICBhY2NvdW50TmFtZTogZGF0YS5iYW5rRGV0YWlscz8uYWNjb3VudE5hbWUgfHwgJycsXG4gICAgICAgICAgYWNjb3VudE51bWJlcjogZGF0YS5iYW5rRGV0YWlscz8uYWNjb3VudE51bWJlciB8fCAnJyxcbiAgICAgICAgICBwcmVmZXJzQ2FzaDogQm9vbGVhbihkYXRhLmJhbmtEZXRhaWxzPy5wcmVmZXJzQ2FzaCksXG4gICAgICAgIH0sXG4gICAgICAgIGRlY2xhcmF0aW9uczoge1xuICAgICAgICAgIGluZm9BY2N1cmF0ZTogQm9vbGVhbihkYXRhLmRlY2xhcmF0aW9ucz8uaW5mb0FjY3VyYXRlKSxcbiAgICAgICAgICBhZ3JlZVJ1bGVzOiBCb29sZWFuKGRhdGEuZGVjbGFyYXRpb25zPy5hZ3JlZVJ1bGVzKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBwZXJmb3JtYW5jZVNjb3JlOiAwLFxuICAgICAgcmlza1JhdGluZzogJ0xvdycsXG4gICAgICB0b3RhbFNwZW5kOiAwLFxuICAgIH0pXG5cbiAgICBjb25zdCBjbGllbnQyID0gYXdhaXQgY2xlcmtDbGllbnQoKVxuICAgIGF3YWl0IGNsaWVudDIudXNlcnMudXBkYXRlVXNlcih1c2VySWQsIHtcbiAgICAgIHB1YmxpY01ldGFkYXRhOiB7XG4gICAgICAgIHJvbGU6ICdzdXBwbGllcicsXG4gICAgICAgIHN1cHBsaWVySWQsXG4gICAgICAgIG9uYm9hcmRpbmdTdGF0dXM6ICdwZW5kaW5nX2FkbWluX2FwcHJvdmFsJyxcbiAgICAgICAgb25ib2FyZGVkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIHJldmFsaWRhdGVQYXRoKCcvb25ib2FyZGluZycpXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzdXBwbGllcikpIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdGYWlsZWQgdG8gc3VibWl0IHN1cHBsaWVyIG9uYm9hcmRpbmcnIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJrVEFRc0IifQ==
}),
"[project]/lib/actions/data:b9f475 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40b533b5a49f64416e62ca9e75858712f207a9ba1d":"submitSupplierOnboarding"},"lib/actions/onboarding-actions.ts",""] */ __turbopack_context__.s([
    "submitSupplierOnboarding",
    ()=>submitSupplierOnboarding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var submitSupplierOnboarding = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("40b533b5a49f64416e62ca9e75858712f207a9ba1d", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "submitSupplierOnboarding"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vb25ib2FyZGluZy1hY3Rpb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc2VydmVyJ1xuXG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gJ25leHQvY2FjaGUnXG5pbXBvcnQgeyBhdXRoLCBjbGVya0NsaWVudCB9IGZyb20gJ0BjbGVyay9uZXh0anMvc2VydmVyJ1xuaW1wb3J0IGRiQ29ubmVjdCBmcm9tICdAL2xpYi9tb25nb2RiJ1xuaW1wb3J0IHsgU3VwcGxpZXIgfSBmcm9tICcuLi9tb2RlbHMvU3VwcGxpZXInXG5pbXBvcnQgeyBDb21wYW55IH0gZnJvbSAnLi4vbW9kZWxzL0NvbXBhbnknXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdWJtaXRDb21wYW55T25ib2FyZGluZyhkYXRhOiB7XG4gIGNvbXBhbnlOYW1lOiBzdHJpbmdcbiAgaW5kdXN0cnk/OiBzdHJpbmdcbiAgcmVnaW9uPzogc3RyaW5nXG4gIHNpemU/OiBzdHJpbmdcbiAgY29udGFjdEVtYWlsPzogc3RyaW5nXG4gIG9yZ2FuaXphdGlvblR5cGU/OiBzdHJpbmdcbiAgYWRkcmVzcz86IHN0cmluZ1xuICBvZmZpY2lhbEVtYWlsPzogc3RyaW5nXG4gIGNvbXBhbnlQaG9uZT86IHN0cmluZ1xuICB3ZWJzaXRlPzogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb25OYW1lPzogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb25Sb2xlPzogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb25QaG9uZT86IHN0cmluZ1xuICBjb250YWN0UGVyc29uRW1haWw/OiBzdHJpbmdcbiAgYnVzaW5lc3NEZXNjcmlwdGlvbj86IHN0cmluZ1xuICBoYXNCcmFuY2hlcz86IGJvb2xlYW5cbiAgbnVtYmVyT2ZCcmFuY2hlcz86IG51bWJlclxuICBicmFuY2hMb2NhdGlvbnM/OiBzdHJpbmdcbiAgY2VudHJhbFN0b3JlPzogc3RyaW5nXG4gIHByb2N1cmVtZW50TWV0aG9kPzogc3RyaW5nXG4gIHJlcXVpcmVzQXBwcm92YWxXb3JrZmxvd3M/OiBib29sZWFuXG4gIGFwcHJvdmFsTGV2ZWxzPzogc3RyaW5nW11cbiAgbWFuYWdlck5hbWU/OiBzdHJpbmdcbiAgbWFuYWdlclBvc2l0aW9uPzogc3RyaW5nXG4gIG1hbmFnZXJFbWFpbD86IHN0cmluZ1xuICBlbXBsb3llZUFjY2Vzc0NvdW50Pzogc3RyaW5nXG4gIGRlcGFydG1lbnRzPzogc3RyaW5nW11cbiAgb3RoZXJEZXBhcnRtZW50Pzogc3RyaW5nXG4gIHJlZ2lzdHJhdGlvblVwbG9hZHM/OiB7IG5hbWU6IHN0cmluZzsgc2l6ZTogbnVtYmVyOyB0eXBlOiBzdHJpbmcgfVtdXG4gIHRpbj86IHN0cmluZ1xuICBsb2dvVXBsb2Fkcz86IHsgbmFtZTogc3RyaW5nOyBzaXplOiBudW1iZXI7IHR5cGU6IHN0cmluZyB9W11cbiAgdmVuZG9yc1NlbGZPbmJvYXJkPzogc3RyaW5nXG4gIHRlbmRlcmluZ0VuYWJsZWQ/OiBib29sZWFuXG4gIGVJbnZvaWNpbmdFbmFibGVkPzogYm9vbGVhblxuICBhbmFseXRpY3NFbmFibGVkPzogYm9vbGVhblxuICBzeXN0ZW1NYW5hZ2VyTmFtZT86IHN0cmluZ1xuICBzeXN0ZW1NYW5hZ2VyUm9sZT86IHN0cmluZ1xuICBpbnZvaWNlc0FwcHJvdmVyPzogc3RyaW5nXG4gIHBvQXBwcm92ZXI/OiBzdHJpbmdcbiAgZ29vZHNSZWNlaXZlcj86IHN0cmluZ1xuICBwcm9qZWN0TGVhZD86IHN0cmluZ1xuICB0cmFpbmluZ09mZmljZXI/OiBzdHJpbmdcbiAgZGVjbGFyYXRpb25JbmZvQWNjdXJhdGU/OiBib29sZWFuXG4gIGRlY2xhcmF0aW9uQWdyZWVPbmJvYXJkaW5nPzogYm9vbGVhblxufSkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdXNlcklkIH0gPSBhd2FpdCBhdXRoKClcbiAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVW5hdXRob3JpemVkJyB9XG4gICAgfVxuXG4gICAgYXdhaXQgZGJDb25uZWN0KClcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IENvbXBhbnkuY291bnREb2N1bWVudHMoKVxuICAgIGNvbnN0IGNvbXBhbnlJZCA9IGBDT01QLSR7KGNvdW50ICsgMTAwMCkudG9TdHJpbmcoKX1gXG5cbiAgICBhd2FpdCBDb21wYW55LmNyZWF0ZSh7XG4gICAgICBjb21wYW55SWQsXG4gICAgICBuYW1lOiBkYXRhLmNvbXBhbnlOYW1lLFxuICAgICAgYXBwcm92ZWQ6IGZhbHNlLFxuICAgICAgaW5kdXN0cnk6IGRhdGEuaW5kdXN0cnkgfHwgJycsXG4gICAgICByZWdpb246IGRhdGEucmVnaW9uIHx8ICcnLFxuICAgICAgc2l6ZTogZGF0YS5zaXplIHx8ICcnLFxuICAgICAgY29udGFjdEVtYWlsOiBkYXRhLmNvbnRhY3RFbWFpbCB8fCAnJyxcbiAgICAgIG93bmVyVXNlcklkOiB1c2VySWQsXG4gICAgICBvbmJvYXJkaW5nOiB7XG4gICAgICAgIGNvbXBhbnlJbmZvcm1hdGlvbjoge1xuICAgICAgICAgIG9yZ2FuaXphdGlvblR5cGU6IGRhdGEub3JnYW5pemF0aW9uVHlwZSB8fCAnJyxcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MgfHwgJycsXG4gICAgICAgICAgb2ZmaWNpYWxFbWFpbDogZGF0YS5vZmZpY2lhbEVtYWlsIHx8ICcnLFxuICAgICAgICAgIHBob25lOiBkYXRhLmNvbXBhbnlQaG9uZSB8fCAnJyxcbiAgICAgICAgICB3ZWJzaXRlOiBkYXRhLndlYnNpdGUgfHwgJycsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRhY3RQZXJzb246IHtcbiAgICAgICAgICBuYW1lOiBkYXRhLmNvbnRhY3RQZXJzb25OYW1lIHx8ICcnLFxuICAgICAgICAgIHJvbGU6IGRhdGEuY29udGFjdFBlcnNvblJvbGUgfHwgJycsXG4gICAgICAgICAgcGhvbmU6IGRhdGEuY29udGFjdFBlcnNvblBob25lIHx8ICcnLFxuICAgICAgICAgIGVtYWlsOiBkYXRhLmNvbnRhY3RQZXJzb25FbWFpbCB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgYnVzaW5lc3NPcGVyYXRpb25zOiB7XG4gICAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuYnVzaW5lc3NEZXNjcmlwdGlvbiB8fCAnJyxcbiAgICAgICAgICBoYXNCcmFuY2hlczogQm9vbGVhbihkYXRhLmhhc0JyYW5jaGVzKSxcbiAgICAgICAgICBudW1iZXJPZkJyYW5jaGVzOiB0eXBlb2YgZGF0YS5udW1iZXJPZkJyYW5jaGVzID09PSAnbnVtYmVyJyA/IGRhdGEubnVtYmVyT2ZCcmFuY2hlcyA6IDAsXG4gICAgICAgICAgYnJhbmNoTG9jYXRpb25zOiBkYXRhLmJyYW5jaExvY2F0aW9ucyB8fCAnJyxcbiAgICAgICAgICBjZW50cmFsU3RvcmU6IGRhdGEuY2VudHJhbFN0b3JlIHx8ICcnLFxuICAgICAgICB9LFxuICAgICAgICBwcm9jdXJlbWVudFN0cnVjdHVyZToge1xuICAgICAgICAgIGN1cnJlbnRNZXRob2Q6IGRhdGEucHJvY3VyZW1lbnRNZXRob2QgfHwgJycsXG4gICAgICAgICAgcmVxdWlyZXNBcHByb3ZhbFdvcmtmbG93czogQm9vbGVhbihkYXRhLnJlcXVpcmVzQXBwcm92YWxXb3JrZmxvd3MpLFxuICAgICAgICAgIGFwcHJvdmFsTGV2ZWxzOiBBcnJheS5pc0FycmF5KGRhdGEuYXBwcm92YWxMZXZlbHMpID8gZGF0YS5hcHByb3ZhbExldmVscyA6IFtdLFxuICAgICAgICAgIG1hbmFnZXI6IHtcbiAgICAgICAgICAgIG5hbWU6IGRhdGEubWFuYWdlck5hbWUgfHwgJycsXG4gICAgICAgICAgICBwb3NpdGlvbjogZGF0YS5tYW5hZ2VyUG9zaXRpb24gfHwgJycsXG4gICAgICAgICAgICBlbWFpbDogZGF0YS5tYW5hZ2VyRW1haWwgfHwgJycsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgdXNlclNldHVwOiB7XG4gICAgICAgICAgZW1wbG95ZWVBY2Nlc3NDb3VudDogZGF0YS5lbXBsb3llZUFjY2Vzc0NvdW50IHx8ICcnLFxuICAgICAgICAgIGRlcGFydG1lbnRzOiBBcnJheS5pc0FycmF5KGRhdGEuZGVwYXJ0bWVudHMpID8gZGF0YS5kZXBhcnRtZW50cyA6IFtdLFxuICAgICAgICAgIG90aGVyRGVwYXJ0bWVudDogZGF0YS5vdGhlckRlcGFydG1lbnQgfHwgJycsXG4gICAgICAgIH0sXG4gICAgICAgIGRvY3VtZW50czoge1xuICAgICAgICAgIHJlZ2lzdHJhdGlvblVwbG9hZHM6IEFycmF5LmlzQXJyYXkoZGF0YS5yZWdpc3RyYXRpb25VcGxvYWRzKSA/IGRhdGEucmVnaXN0cmF0aW9uVXBsb2FkcyA6IFtdLFxuICAgICAgICAgIHRpbjogZGF0YS50aW4gfHwgJycsXG4gICAgICAgICAgbG9nb1VwbG9hZHM6IEFycmF5LmlzQXJyYXkoZGF0YS5sb2dvVXBsb2FkcykgPyBkYXRhLmxvZ29VcGxvYWRzIDogW10sXG4gICAgICAgIH0sXG4gICAgICAgIHN5c3RlbUNvbmZpZ3VyYXRpb246IHtcbiAgICAgICAgICB2ZW5kb3JzU2VsZk9uYm9hcmQ6IGRhdGEudmVuZG9yc1NlbGZPbmJvYXJkIHx8ICcnLFxuICAgICAgICAgIHRlbmRlcmluZ0VuYWJsZWQ6IEJvb2xlYW4oZGF0YS50ZW5kZXJpbmdFbmFibGVkKSxcbiAgICAgICAgICBlSW52b2ljaW5nRW5hYmxlZDogQm9vbGVhbihkYXRhLmVJbnZvaWNpbmdFbmFibGVkKSxcbiAgICAgICAgICBhbmFseXRpY3NFbmFibGVkOiBCb29sZWFuKGRhdGEuYW5hbHl0aWNzRW5hYmxlZCksXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3BvbnNpYmlsaXRpZXM6IHtcbiAgICAgICAgICBzeXN0ZW1NYW5hZ2VyTmFtZTogZGF0YS5zeXN0ZW1NYW5hZ2VyTmFtZSB8fCAnJyxcbiAgICAgICAgICBzeXN0ZW1NYW5hZ2VyUm9sZTogZGF0YS5zeXN0ZW1NYW5hZ2VyUm9sZSB8fCAnJyxcbiAgICAgICAgICBpbnZvaWNlc0FwcHJvdmVyOiBkYXRhLmludm9pY2VzQXBwcm92ZXIgfHwgJycsXG4gICAgICAgICAgcG9BcHByb3ZlcjogZGF0YS5wb0FwcHJvdmVyIHx8ICcnLFxuICAgICAgICAgIGdvb2RzUmVjZWl2ZXI6IGRhdGEuZ29vZHNSZWNlaXZlciB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgdGVhbU1lbWJlcnM6IHtcbiAgICAgICAgICBwcm9qZWN0TGVhZDogZGF0YS5wcm9qZWN0TGVhZCB8fCAnJyxcbiAgICAgICAgICB0cmFpbmluZ09mZmljZXI6IGRhdGEudHJhaW5pbmdPZmZpY2VyIHx8ICcnLFxuICAgICAgICB9LFxuICAgICAgICBkZWNsYXJhdGlvbnM6IHtcbiAgICAgICAgICBpbmZvQWNjdXJhdGU6IEJvb2xlYW4oZGF0YS5kZWNsYXJhdGlvbkluZm9BY2N1cmF0ZSksXG4gICAgICAgICAgYWdyZWVPbmJvYXJkaW5nOiBCb29sZWFuKGRhdGEuZGVjbGFyYXRpb25BZ3JlZU9uYm9hcmRpbmcpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgY2xlcmtDbGllbnQoKVxuICAgIGF3YWl0IGNsaWVudC51c2Vycy51cGRhdGVVc2VyKHVzZXJJZCwge1xuICAgICAgcHVibGljTWV0YWRhdGE6IHtcbiAgICAgICAgcm9sZTogJ2NvbXBhbnknLFxuICAgICAgICBjb21wYW55SWQsXG4gICAgICAgIG9uYm9hcmRpbmdTdGF0dXM6ICdwZW5kaW5nX2FkbWluX2FwcHJvdmFsJyxcbiAgICAgICAgY29tcGFueToge1xuICAgICAgICAgIG5hbWU6IGRhdGEuY29tcGFueU5hbWUsXG4gICAgICAgICAgaW5kdXN0cnk6IGRhdGEuaW5kdXN0cnkgfHwgJycsXG4gICAgICAgICAgcmVnaW9uOiBkYXRhLnJlZ2lvbiB8fCAnJyxcbiAgICAgICAgICBzaXplOiBkYXRhLnNpemUgfHwgJycsXG4gICAgICAgICAgY29udGFjdEVtYWlsOiBkYXRhLmNvbnRhY3RFbWFpbCB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgb25ib2FyZGVkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIHJldmFsaWRhdGVQYXRoKCcvb25ib2FyZGluZycpXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogeyBjb21wYW55SWQgfSB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRmFpbGVkIHRvIHN1Ym1pdCBjb21wYW55IG9uYm9hcmRpbmcnIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3VibWl0U3VwcGxpZXJPbmJvYXJkaW5nKGRhdGE6IHtcbiAgbmFtZTogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb24/OiBzdHJpbmdcbiAgcGhvbmU/OiBzdHJpbmdcbiAgZW1haWw/OiBzdHJpbmdcbiAgZ29vZHNUeXBlPzogc3RyaW5nXG4gIHByb2R1Y3RDYXRlZ29yaWVzPzogc3RyaW5nW11cbiAgc3VwcGx5QXJlYXM/OiBzdHJpbmdbXVxuICBkZWxpdmVyeVRpbWVsaW5lPzogc3RyaW5nXG4gIHByaWNlTGlzdFVwbG9hZHM/OiB7IG5hbWU6IHN0cmluZzsgc2l6ZTogbnVtYmVyOyB0eXBlOiBzdHJpbmcgfVtdXG4gIHJlZ2lzdHJhdGlvbkNlcnRpZmljYXRlVXBsb2Fkcz86IHsgbmFtZTogc3RyaW5nOyBzaXplOiBudW1iZXI7IHR5cGU6IHN0cmluZyB9W11cbiAgYmFua0RldGFpbHM/OiB7IGJhbmtOYW1lPzogc3RyaW5nOyBhY2NvdW50TmFtZT86IHN0cmluZzsgYWNjb3VudE51bWJlcj86IHN0cmluZzsgcHJlZmVyc0Nhc2g/OiBib29sZWFuIH1cbiAgZGVjbGFyYXRpb25zPzogeyBpbmZvQWNjdXJhdGU/OiBib29sZWFuOyBhZ3JlZVJ1bGVzPzogYm9vbGVhbiB9XG4gIGNhdGVnb3J5Pzogc3RyaW5nXG4gIHJlZ2lvbj86IHN0cmluZ1xuICBzZWdtZW50Pzogc3RyaW5nXG59KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyB1c2VySWQgfSA9IGF3YWl0IGF1dGgoKVxuICAgIGlmICghdXNlcklkKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH1cbiAgICBhd2FpdCBkYkNvbm5lY3QoKVxuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgU3VwcGxpZXIuY291bnREb2N1bWVudHMoKVxuICAgIGNvbnN0IHN1cHBsaWVySWQgPSBgU1VQLSR7KGNvdW50ICsgNTAwMCkudG9TdHJpbmcoKX1gXG4gICAgY29uc3Qgc3VwcGxpZXIgPSBhd2FpdCBTdXBwbGllci5jcmVhdGUoe1xuICAgICAgc3VwcGxpZXJJZCxcbiAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgIGFwcHJvdmVkOiBmYWxzZSxcbiAgICAgIG93bmVyVXNlcklkOiB1c2VySWQsXG4gICAgICBjYXRlZ29yeTogZGF0YS5jYXRlZ29yeSB8fCAnR2VuZXJhbCcsXG4gICAgICByZWdpb246IGRhdGEucmVnaW9uIHx8ICdHbG9iYWwnLFxuICAgICAgc2VnbWVudDogZGF0YS5zZWdtZW50IHx8ICdTdGFuZGFyZCcsXG4gICAgICBvbmJvYXJkaW5nOiB7XG4gICAgICAgIGNvbnRhY3RQZXJzb246IGRhdGEuY29udGFjdFBlcnNvbiB8fCAnJyxcbiAgICAgICAgcGhvbmU6IGRhdGEucGhvbmUgfHwgJycsXG4gICAgICAgIGVtYWlsOiBkYXRhLmVtYWlsIHx8ICcnLFxuICAgICAgICBnb29kc1R5cGU6IGRhdGEuZ29vZHNUeXBlIHx8ICcnLFxuICAgICAgICBwcm9kdWN0Q2F0ZWdvcmllczogQXJyYXkuaXNBcnJheShkYXRhLnByb2R1Y3RDYXRlZ29yaWVzKSA/IGRhdGEucHJvZHVjdENhdGVnb3JpZXMgOiBbXSxcbiAgICAgICAgc3VwcGx5QXJlYXM6IEFycmF5LmlzQXJyYXkoZGF0YS5zdXBwbHlBcmVhcykgPyBkYXRhLnN1cHBseUFyZWFzIDogW10sXG4gICAgICAgIGRlbGl2ZXJ5VGltZWxpbmU6IGRhdGEuZGVsaXZlcnlUaW1lbGluZSB8fCAnJyxcbiAgICAgICAgcHJpY2VMaXN0VXBsb2FkczogQXJyYXkuaXNBcnJheShkYXRhLnByaWNlTGlzdFVwbG9hZHMpID8gZGF0YS5wcmljZUxpc3RVcGxvYWRzIDogW10sXG4gICAgICAgIHJlZ2lzdHJhdGlvbkNlcnRpZmljYXRlVXBsb2FkczogQXJyYXkuaXNBcnJheShkYXRhLnJlZ2lzdHJhdGlvbkNlcnRpZmljYXRlVXBsb2FkcykgPyBkYXRhLnJlZ2lzdHJhdGlvbkNlcnRpZmljYXRlVXBsb2FkcyA6IFtdLFxuICAgICAgICBiYW5rRGV0YWlsczoge1xuICAgICAgICAgIGJhbmtOYW1lOiBkYXRhLmJhbmtEZXRhaWxzPy5iYW5rTmFtZSB8fCAnJyxcbiAgICAgICAgICBhY2NvdW50TmFtZTogZGF0YS5iYW5rRGV0YWlscz8uYWNjb3VudE5hbWUgfHwgJycsXG4gICAgICAgICAgYWNjb3VudE51bWJlcjogZGF0YS5iYW5rRGV0YWlscz8uYWNjb3VudE51bWJlciB8fCAnJyxcbiAgICAgICAgICBwcmVmZXJzQ2FzaDogQm9vbGVhbihkYXRhLmJhbmtEZXRhaWxzPy5wcmVmZXJzQ2FzaCksXG4gICAgICAgIH0sXG4gICAgICAgIGRlY2xhcmF0aW9uczoge1xuICAgICAgICAgIGluZm9BY2N1cmF0ZTogQm9vbGVhbihkYXRhLmRlY2xhcmF0aW9ucz8uaW5mb0FjY3VyYXRlKSxcbiAgICAgICAgICBhZ3JlZVJ1bGVzOiBCb29sZWFuKGRhdGEuZGVjbGFyYXRpb25zPy5hZ3JlZVJ1bGVzKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBwZXJmb3JtYW5jZVNjb3JlOiAwLFxuICAgICAgcmlza1JhdGluZzogJ0xvdycsXG4gICAgICB0b3RhbFNwZW5kOiAwLFxuICAgIH0pXG5cbiAgICBjb25zdCBjbGllbnQyID0gYXdhaXQgY2xlcmtDbGllbnQoKVxuICAgIGF3YWl0IGNsaWVudDIudXNlcnMudXBkYXRlVXNlcih1c2VySWQsIHtcbiAgICAgIHB1YmxpY01ldGFkYXRhOiB7XG4gICAgICAgIHJvbGU6ICdzdXBwbGllcicsXG4gICAgICAgIHN1cHBsaWVySWQsXG4gICAgICAgIG9uYm9hcmRpbmdTdGF0dXM6ICdwZW5kaW5nX2FkbWluX2FwcHJvdmFsJyxcbiAgICAgICAgb25ib2FyZGVkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIHJldmFsaWRhdGVQYXRoKCcvb25ib2FyZGluZycpXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzdXBwbGllcikpIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdGYWlsZWQgdG8gc3VibWl0IHN1cHBsaWVyIG9uYm9hcmRpbmcnIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJtVEFrS3NCIn0=
}),
"[project]/app/(onboard)/onboarding/OnboardingContent.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OnboardingContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$status$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/status-badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$9e375e__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/lib/actions/data:9e375e [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$b9f475__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/lib/actions/data:b9f475 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function OnboardingContent() {
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [companyName, setCompanyName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [industry, setIndustry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [size, setSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [organizationType, setOrganizationType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [businessAddress, setBusinessAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [companyOfficialEmail, setCompanyOfficialEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [companyPhone, setCompanyPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [website, setWebsite] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [primaryContactName, setPrimaryContactName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [businessDescription, setBusinessDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [hasBranches, setHasBranches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [numberOfBranches, setNumberOfBranches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [branchLocations, setBranchLocations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [projectLead, setProjectLead] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [trainingOfficer, setTrainingOfficer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [registrationUploads, setRegistrationUploads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [logoUploads, setLogoUploads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [declCompanyInfoAccurate, setDeclCompanyInfoAccurate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [declCompanyAgree, setDeclCompanyAgree] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [supplierName, setSupplierName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [contactPerson, setContactPerson] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [productCategories, setProductCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [supplyAreasText, setSupplyAreasText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [deliveryTimeline, setDeliveryTimeline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [businessRegCertFiles, setBusinessRegCertFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [taxClearanceFiles, setTaxClearanceFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [gstVatFiles, setGstVatFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [businessLicenseFiles, setBusinessLicenseFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [nassitFiles, setNassitFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sectorCertFiles, setSectorCertFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [paymentMethods, setPaymentMethods] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [prefersCash, setPrefersCash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [declInfoAccurate, setDeclInfoAccurate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [declAgreeRules, setDeclAgreeRules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const submitCompany = async ()=>{
        setLoading("company");
        const regUploads = registrationUploads ? Array.from(registrationUploads).map((f)=>({
                name: f.name,
                size: f.size,
                type: f.type
            })) : [];
        const logos = logoUploads ? Array.from(logoUploads).map((f)=>({
                name: f.name,
                size: f.size,
                type: f.type
            })) : [];
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$9e375e__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["submitCompanyOnboarding"])({
            companyName,
            industry,
            size,
            organizationType,
            address: businessAddress,
            officialEmail: companyOfficialEmail,
            companyPhone,
            website,
            contactPersonName: primaryContactName,
            businessDescription,
            hasBranches,
            numberOfBranches,
            branchLocations,
            projectLead,
            trainingOfficer,
            registrationUploads: regUploads,
            logoUploads: logos,
            declarationInfoAccurate: declCompanyInfoAccurate,
            declarationAgreeOnboarding: declCompanyAgree
        });
        setLoading(null);
        if (res && res.success) router.push("/onboarding/submitted?type=company");
    };
    const submitSupplier = async ()=>{
        setLoading("supplier");
        const regUploads = [
            businessRegCertFiles,
            taxClearanceFiles,
            gstVatFiles,
            businessLicenseFiles,
            nassitFiles,
            sectorCertFiles
        ].flatMap((list)=>list ? Array.from(list).map((f)=>({
                    name: f.name,
                    size: f.size,
                    type: f.type
                })) : []);
        const supplyAreas = supplyAreasText.split(',').map((s)=>s.trim()).filter(Boolean);
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$b9f475__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["submitSupplierOnboarding"])({
            name: supplierName,
            contactPerson,
            phone,
            email,
            productCategories,
            supplyAreas,
            deliveryTimeline,
            registrationCertificateUploads: regUploads,
            bankDetails: {
                prefersCash
            },
            declarations: {
                infoAccurate: declInfoAccurate,
                agreeRules: declAgreeRules
            }
        });
        setLoading(null);
        if (res && res.success) router.push("/onboarding/submitted?type=supplier");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-muted/30 p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-2xl",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "text-base",
                                            children: "Welcome"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 118,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                                            className: "text-xs",
                                            children: "Select your role and complete onboarding."
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 119,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$status$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                    status: role ? role : "Select role"
                                }, void 0, false, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 121,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                            lineNumber: 116,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: !role ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>setRole("company"),
                                    children: "I am a company"
                                }, void 0, false, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 127,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>setRole("supplier"),
                                    children: "I am a supplier"
                                }, void 0, false, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 128,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                            lineNumber: 126,
                            columnNumber: 15
                        }, this) : role === "company" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Company Name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 133,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            value: companyName,
                                            onChange: (e)=>setCompanyName(e.target.value),
                                            placeholder: "Acme Corp"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 134,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 132,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Company Logo (Upload)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 137,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "file",
                                            multiple: true,
                                            accept: "image/*,.pdf,.svg,.png,.jpg",
                                            onChange: (e)=>setLogoUploads(e.target.files)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 138,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 136,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Type of Organization"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 141,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            value: organizationType,
                                            onChange: (e)=>setOrganizationType(e.target.value),
                                            placeholder: "Sole Proprietor / Ltd / NGO / Government / Other"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 142,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 140,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Business / Company Address"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 145,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            value: businessAddress,
                                            onChange: (e)=>setBusinessAddress(e.target.value),
                                            placeholder: "Address"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 146,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 144,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Official Email Address"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: companyOfficialEmail,
                                                    onChange: (e)=>setCompanyOfficialEmail(e.target.value),
                                                    placeholder: "info@company.com"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 149,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Company Phone / WhatsApp"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: companyPhone,
                                                    onChange: (e)=>setCompanyPhone(e.target.value),
                                                    placeholder: "+232 76 123 456"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 153,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 148,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Official Website"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 159,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            value: website,
                                            onChange: (e)=>setWebsite(e.target.value),
                                            placeholder: "https://"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 160,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 158,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Industry"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: industry,
                                                    onChange: (e)=>setIndustry(e.target.value),
                                                    placeholder: "Manufacturing"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 163,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Company Size"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: size,
                                                    onChange: (e)=>setSize(e.target.value),
                                                    placeholder: "500+"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 167,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 162,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Primary Contact Person"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 173,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            value: primaryContactName,
                                            onChange: (e)=>setPrimaryContactName(e.target.value),
                                            placeholder: "Jane Doe"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 174,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 172,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Company Description (What the company does)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 177,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            value: businessDescription,
                                            onChange: (e)=>setBusinessDescription(e.target.value),
                                            placeholder: "Brief description"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 178,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 176,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Uploaded Company Documents"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 181,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "file",
                                            multiple: true,
                                            accept: "image/*,.pdf",
                                            onChange: (e)=>setRegistrationUploads(e.target.files)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 182,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 180,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Branch Information"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 185,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Has Branches (Yes/No)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2 text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: hasBranches,
                                                            onChange: (e)=>setHasBranches(e.target.checked)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                            lineNumber: 188,
                                                            columnNumber: 72
                                                        }, this),
                                                        " Yes"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 186,
                                            columnNumber: 19
                                        }, this),
                                        hasBranches && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "If Yes – Number of Branches"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    type: "number",
                                                    value: numberOfBranches,
                                                    onChange: (e)=>setNumberOfBranches(Number(e.target.value)),
                                                    placeholder: "0"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 191,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Branch Locations (List)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: branchLocations,
                                                    onChange: (e)=>setBranchLocations(e.target.value),
                                                    placeholder: "Comma separated"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 198,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 196,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 184,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Team Members"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 202,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: projectLead,
                                                    onChange: (e)=>setProjectLead(e.target.value),
                                                    placeholder: "Project Lead"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: trainingOfficer,
                                                    onChange: (e)=>setTrainingOfficer(e.target.value),
                                                    placeholder: "Training Officer / Supervisor"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 203,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 201,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Responsibilities & Agreement"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 209,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: declCompanyInfoAccurate,
                                                    onChange: (e)=>setDeclCompanyInfoAccurate(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 70
                                                }, this),
                                                " Confirm that the information provided is accurate."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 210,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: declCompanyAgree,
                                                    onChange: (e)=>setDeclCompanyAgree(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 70
                                                }, this),
                                                " Agree that the company is onboarding onto the e-Procurement platform."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 211,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 208,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 pt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            onClick: ()=>setRole(null),
                                            className: "flex-1",
                                            children: "Back"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 214,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: submitCompany,
                                            className: "flex-1",
                                            disabled: !companyName || !declCompanyInfoAccurate || !declCompanyAgree || loading !== null,
                                            children: loading === "company" ? "Submitting..." : "Submit"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 215,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 213,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                            lineNumber: 131,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Supplier Name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 221,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            value: supplierName,
                                            onChange: (e)=>setSupplierName(e.target.value),
                                            placeholder: "Northwind Trading"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 222,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 220,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Contact Person Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: contactPerson,
                                                    onChange: (e)=>setContactPerson(e.target.value),
                                                    placeholder: "John Doe"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 225,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Phone / WhatsApp"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: phone,
                                                    onChange: (e)=>setPhone(e.target.value),
                                                    placeholder: "+232 76 123 456"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 229,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 224,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Email Address"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 235,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            value: email,
                                            onChange: (e)=>setEmail(e.target.value),
                                            placeholder: "supplier@example.com"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 236,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 234,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Product / Service Categories"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 239,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
                                            children: [
                                                'Food',
                                                'Beverages',
                                                'Cleaning',
                                                'IT Equipment',
                                                'Stationeries',
                                                'Transport / Delivery',
                                                'Telecom'
                                            ].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2 text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: productCategories.includes(cat),
                                                            onChange: (e)=>{
                                                                setProductCategories((prev)=>e.target.checked ? [
                                                                        ...prev,
                                                                        cat
                                                                    ] : prev.filter((c)=>c !== cat));
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                            lineNumber: 243,
                                                            columnNumber: 25
                                                        }, this),
                                                        cat
                                                    ]
                                                }, cat, true, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 240,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 238,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Areas You Can Supply / Deliver To"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 256,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            value: supplyAreasText,
                                            onChange: (e)=>setSupplyAreasText(e.target.value),
                                            placeholder: "Enter areas, comma separated"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 257,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 255,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Delivery Timeline"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 260,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-3 text-xs",
                                            children: [
                                                'Same day',
                                                '24 hours',
                                                '2-3 days'
                                            ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            name: "delivery_timeline",
                                                            checked: deliveryTimeline === opt,
                                                            onChange: ()=>setDeliveryTimeline(opt)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                            lineNumber: 264,
                                                            columnNumber: 25
                                                        }, this),
                                                        opt
                                                    ]
                                                }, opt, true, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 261,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 259,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Uploaded Documents"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 276,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Business Registration Certificate"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    type: "file",
                                                    multiple: true,
                                                    accept: "image/*,.pdf",
                                                    onChange: (e)=>setBusinessRegCertFiles(e.target.files)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 277,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Tax Clearance Certificate"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 282,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    type: "file",
                                                    multiple: true,
                                                    accept: "image/*,.pdf",
                                                    onChange: (e)=>setTaxClearanceFiles(e.target.files)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 281,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "GST/VAT Registration Certificate"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    type: "file",
                                                    multiple: true,
                                                    accept: "image/*,.pdf",
                                                    onChange: (e)=>setGstVatFiles(e.target.files)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 287,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 285,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Valid Business License"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 290,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    type: "file",
                                                    multiple: true,
                                                    accept: "image/*,.pdf",
                                                    onChange: (e)=>setBusinessLicenseFiles(e.target.files)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 289,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "NASSIT Certificate"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    type: "file",
                                                    multiple: true,
                                                    accept: "image/*,.pdf",
                                                    onChange: (e)=>setNassitFiles(e.target.files)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 293,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Any sector-specific certifications (ISO, Food Handling, Safety, etc.)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 298,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    type: "file",
                                                    multiple: true,
                                                    accept: "image/*,.pdf",
                                                    onChange: (e)=>setSectorCertFiles(e.target.files)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 299,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 297,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 275,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Payment Method"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 303,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
                                            children: [
                                                'Card',
                                                'Mobile Money',
                                                'Bank'
                                            ].map((method)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2 text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: paymentMethods.includes(method),
                                                            onChange: (e)=>{
                                                                setPaymentMethods((prev)=>e.target.checked ? [
                                                                        ...prev,
                                                                        method
                                                                    ] : prev.filter((m)=>m !== method));
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                            lineNumber: 307,
                                                            columnNumber: 25
                                                        }, this),
                                                        method
                                                    ]
                                                }, method, true, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 304,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 302,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Vendor Prefers Cash"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 320,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: prefersCash,
                                                    onChange: (e)=>setPrefersCash(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 21
                                                }, this),
                                                " Yes"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 321,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 319,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Declaration & Agreement"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 326,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: declInfoAccurate,
                                                    onChange: (e)=>setDeclInfoAccurate(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 21
                                                }, this),
                                                "Confirm that the information provided is accurate."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 327,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: declAgreeRules,
                                                    onChange: (e)=>setDeclAgreeRules(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 332,
                                                    columnNumber: 21
                                                }, this),
                                                "Agree to follow the procurement and delivery rules."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 331,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 325,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 pt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            onClick: ()=>setRole(null),
                                            className: "flex-1",
                                            children: "Back"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 337,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: submitSupplier,
                                            className: "flex-1",
                                            disabled: !supplierName || !declInfoAccurate || !declAgreeRules || loading !== null,
                                            children: loading === "supplier" ? "Submitting..." : "Submit"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 338,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 336,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                            lineNumber: 219,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                lineNumber: 114,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
            lineNumber: 113,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_f479bb9c._.js.map