(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/status-badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatusBadge",
    ()=>StatusBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        variant: variant || "secondary",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-normal", getStatusColor(status)),
        children: status
    }, void 0, false, {
        fileName: "[project]/components/status-badge.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = StatusBadge;
var _c;
__turbopack_context__.k.register(_c, "StatusBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/actions/data:56d78d [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40f25c9448fb0c5a0c4bd6e6f0e64d26543287adad":"submitCompanyOnboarding"},"lib/actions/onboarding-actions.ts",""] */ __turbopack_context__.s([
    "submitCompanyOnboarding",
    ()=>submitCompanyOnboarding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var submitCompanyOnboarding = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40f25c9448fb0c5a0c4bd6e6f0e64d26543287adad", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "submitCompanyOnboarding"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vb25ib2FyZGluZy1hY3Rpb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc2VydmVyJ1xuXG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gJ25leHQvY2FjaGUnXG5pbXBvcnQgeyBhdXRoLCBjbGVya0NsaWVudCB9IGZyb20gJ0BjbGVyay9uZXh0anMvc2VydmVyJ1xuaW1wb3J0IGRiQ29ubmVjdCBmcm9tICdAL2xpYi9tb25nb2RiJ1xuaW1wb3J0IHsgU3VwcGxpZXIgfSBmcm9tICcuLi9tb2RlbHMvU3VwcGxpZXInXG5pbXBvcnQgeyBDb21wYW55IH0gZnJvbSAnLi4vbW9kZWxzL0NvbXBhbnknXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdWJtaXRDb21wYW55T25ib2FyZGluZyhkYXRhOiB7XG4gIGNvbXBhbnlOYW1lOiBzdHJpbmdcbiAgaW5kdXN0cnk/OiBzdHJpbmdcbiAgcmVnaW9uPzogc3RyaW5nXG4gIHNpemU/OiBzdHJpbmdcbiAgY29udGFjdEVtYWlsPzogc3RyaW5nXG4gIG9yZ2FuaXphdGlvblR5cGU/OiBzdHJpbmdcbiAgYWRkcmVzcz86IHN0cmluZ1xuICBvZmZpY2lhbEVtYWlsPzogc3RyaW5nXG4gIGNvbXBhbnlQaG9uZT86IHN0cmluZ1xuICB3ZWJzaXRlPzogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb25OYW1lPzogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb25Sb2xlPzogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb25QaG9uZT86IHN0cmluZ1xuICBjb250YWN0UGVyc29uRW1haWw/OiBzdHJpbmdcbiAgYnVzaW5lc3NEZXNjcmlwdGlvbj86IHN0cmluZ1xuICBicmFuY2hlc0NvdW50Pzogc3RyaW5nXG4gIGJyYW5jaExvY2F0aW9ucz86IHN0cmluZ1xuICBjZW50cmFsU3RvcmU/OiBzdHJpbmdcbiAgcHJvY3VyZW1lbnRNZXRob2Q/OiBzdHJpbmdcbiAgcmVxdWlyZXNBcHByb3ZhbFdvcmtmbG93cz86IGJvb2xlYW5cbiAgYXBwcm92YWxMZXZlbHM/OiBzdHJpbmdbXVxuICBtYW5hZ2VyTmFtZT86IHN0cmluZ1xuICBtYW5hZ2VyUG9zaXRpb24/OiBzdHJpbmdcbiAgbWFuYWdlckVtYWlsPzogc3RyaW5nXG4gIGVtcGxveWVlQWNjZXNzQ291bnQ/OiBzdHJpbmdcbiAgZGVwYXJ0bWVudHM/OiBzdHJpbmdbXVxuICBvdGhlckRlcGFydG1lbnQ/OiBzdHJpbmdcbiAgcmVnaXN0cmF0aW9uVXBsb2Fkcz86IHsgbmFtZTogc3RyaW5nOyBzaXplOiBudW1iZXI7IHR5cGU6IHN0cmluZyB9W11cbiAgdGluPzogc3RyaW5nXG4gIGxvZ29VcGxvYWRzPzogeyBuYW1lOiBzdHJpbmc7IHNpemU6IG51bWJlcjsgdHlwZTogc3RyaW5nIH1bXVxuICB2ZW5kb3JzU2VsZk9uYm9hcmQ/OiBzdHJpbmdcbiAgdGVuZGVyaW5nRW5hYmxlZD86IGJvb2xlYW5cbiAgZUludm9pY2luZ0VuYWJsZWQ/OiBib29sZWFuXG4gIGFuYWx5dGljc0VuYWJsZWQ/OiBib29sZWFuXG4gIHN5c3RlbU1hbmFnZXJOYW1lPzogc3RyaW5nXG4gIHN5c3RlbU1hbmFnZXJSb2xlPzogc3RyaW5nXG4gIGludm9pY2VzQXBwcm92ZXI/OiBzdHJpbmdcbiAgcG9BcHByb3Zlcj86IHN0cmluZ1xuICBnb29kc1JlY2VpdmVyPzogc3RyaW5nXG4gIGRlY2xhcmF0aW9uSW5mb0FjY3VyYXRlPzogYm9vbGVhblxuICBkZWNsYXJhdGlvbkFncmVlT25ib2FyZGluZz86IGJvb2xlYW5cbn0pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHVzZXJJZCB9ID0gYXdhaXQgYXV0aCgpXG4gICAgaWYgKCF1c2VySWQpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfVxuICAgIH1cblxuICAgIGF3YWl0IGRiQ29ubmVjdCgpXG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBDb21wYW55LmNvdW50RG9jdW1lbnRzKClcbiAgICBjb25zdCBjb21wYW55SWQgPSBgQ09NUC0keyhjb3VudCArIDEwMDApLnRvU3RyaW5nKCl9YFxuXG4gICAgYXdhaXQgQ29tcGFueS5jcmVhdGUoe1xuICAgICAgY29tcGFueUlkLFxuICAgICAgbmFtZTogZGF0YS5jb21wYW55TmFtZSxcbiAgICAgIGFwcHJvdmVkOiBmYWxzZSxcbiAgICAgIGluZHVzdHJ5OiBkYXRhLmluZHVzdHJ5IHx8ICcnLFxuICAgICAgcmVnaW9uOiBkYXRhLnJlZ2lvbiB8fCAnJyxcbiAgICAgIHNpemU6IGRhdGEuc2l6ZSB8fCAnJyxcbiAgICAgIGNvbnRhY3RFbWFpbDogZGF0YS5jb250YWN0RW1haWwgfHwgJycsXG4gICAgICBvd25lclVzZXJJZDogdXNlcklkLFxuICAgICAgb25ib2FyZGluZzoge1xuICAgICAgICBjb21wYW55SW5mb3JtYXRpb246IHtcbiAgICAgICAgICBvcmdhbml6YXRpb25UeXBlOiBkYXRhLm9yZ2FuaXphdGlvblR5cGUgfHwgJycsXG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzIHx8ICcnLFxuICAgICAgICAgIG9mZmljaWFsRW1haWw6IGRhdGEub2ZmaWNpYWxFbWFpbCB8fCAnJyxcbiAgICAgICAgICBwaG9uZTogZGF0YS5jb21wYW55UGhvbmUgfHwgJycsXG4gICAgICAgICAgd2Vic2l0ZTogZGF0YS53ZWJzaXRlIHx8ICcnLFxuICAgICAgICB9LFxuICAgICAgICBjb250YWN0UGVyc29uOiB7XG4gICAgICAgICAgbmFtZTogZGF0YS5jb250YWN0UGVyc29uTmFtZSB8fCAnJyxcbiAgICAgICAgICByb2xlOiBkYXRhLmNvbnRhY3RQZXJzb25Sb2xlIHx8ICcnLFxuICAgICAgICAgIHBob25lOiBkYXRhLmNvbnRhY3RQZXJzb25QaG9uZSB8fCAnJyxcbiAgICAgICAgICBlbWFpbDogZGF0YS5jb250YWN0UGVyc29uRW1haWwgfHwgJycsXG4gICAgICAgIH0sXG4gICAgICAgIGJ1c2luZXNzT3BlcmF0aW9uczoge1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmJ1c2luZXNzRGVzY3JpcHRpb24gfHwgJycsXG4gICAgICAgICAgYnJhbmNoZXNDb3VudDogZGF0YS5icmFuY2hlc0NvdW50IHx8ICcnLFxuICAgICAgICAgIGJyYW5jaExvY2F0aW9uczogZGF0YS5icmFuY2hMb2NhdGlvbnMgfHwgJycsXG4gICAgICAgICAgY2VudHJhbFN0b3JlOiBkYXRhLmNlbnRyYWxTdG9yZSB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgcHJvY3VyZW1lbnRTdHJ1Y3R1cmU6IHtcbiAgICAgICAgICBjdXJyZW50TWV0aG9kOiBkYXRhLnByb2N1cmVtZW50TWV0aG9kIHx8ICcnLFxuICAgICAgICAgIHJlcXVpcmVzQXBwcm92YWxXb3JrZmxvd3M6IEJvb2xlYW4oZGF0YS5yZXF1aXJlc0FwcHJvdmFsV29ya2Zsb3dzKSxcbiAgICAgICAgICBhcHByb3ZhbExldmVsczogQXJyYXkuaXNBcnJheShkYXRhLmFwcHJvdmFsTGV2ZWxzKSA/IGRhdGEuYXBwcm92YWxMZXZlbHMgOiBbXSxcbiAgICAgICAgICBtYW5hZ2VyOiB7XG4gICAgICAgICAgICBuYW1lOiBkYXRhLm1hbmFnZXJOYW1lIHx8ICcnLFxuICAgICAgICAgICAgcG9zaXRpb246IGRhdGEubWFuYWdlclBvc2l0aW9uIHx8ICcnLFxuICAgICAgICAgICAgZW1haWw6IGRhdGEubWFuYWdlckVtYWlsIHx8ICcnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHVzZXJTZXR1cDoge1xuICAgICAgICAgIGVtcGxveWVlQWNjZXNzQ291bnQ6IGRhdGEuZW1wbG95ZWVBY2Nlc3NDb3VudCB8fCAnJyxcbiAgICAgICAgICBkZXBhcnRtZW50czogQXJyYXkuaXNBcnJheShkYXRhLmRlcGFydG1lbnRzKSA/IGRhdGEuZGVwYXJ0bWVudHMgOiBbXSxcbiAgICAgICAgICBvdGhlckRlcGFydG1lbnQ6IGRhdGEub3RoZXJEZXBhcnRtZW50IHx8ICcnLFxuICAgICAgICB9LFxuICAgICAgICBkb2N1bWVudHM6IHtcbiAgICAgICAgICByZWdpc3RyYXRpb25VcGxvYWRzOiBBcnJheS5pc0FycmF5KGRhdGEucmVnaXN0cmF0aW9uVXBsb2FkcykgPyBkYXRhLnJlZ2lzdHJhdGlvblVwbG9hZHMgOiBbXSxcbiAgICAgICAgICB0aW46IGRhdGEudGluIHx8ICcnLFxuICAgICAgICAgIGxvZ29VcGxvYWRzOiBBcnJheS5pc0FycmF5KGRhdGEubG9nb1VwbG9hZHMpID8gZGF0YS5sb2dvVXBsb2FkcyA6IFtdLFxuICAgICAgICB9LFxuICAgICAgICBzeXN0ZW1Db25maWd1cmF0aW9uOiB7XG4gICAgICAgICAgdmVuZG9yc1NlbGZPbmJvYXJkOiBkYXRhLnZlbmRvcnNTZWxmT25ib2FyZCB8fCAnJyxcbiAgICAgICAgICB0ZW5kZXJpbmdFbmFibGVkOiBCb29sZWFuKGRhdGEudGVuZGVyaW5nRW5hYmxlZCksXG4gICAgICAgICAgZUludm9pY2luZ0VuYWJsZWQ6IEJvb2xlYW4oZGF0YS5lSW52b2ljaW5nRW5hYmxlZCksXG4gICAgICAgICAgYW5hbHl0aWNzRW5hYmxlZDogQm9vbGVhbihkYXRhLmFuYWx5dGljc0VuYWJsZWQpLFxuICAgICAgICB9LFxuICAgICAgICByZXNwb25zaWJpbGl0aWVzOiB7XG4gICAgICAgICAgc3lzdGVtTWFuYWdlck5hbWU6IGRhdGEuc3lzdGVtTWFuYWdlck5hbWUgfHwgJycsXG4gICAgICAgICAgc3lzdGVtTWFuYWdlclJvbGU6IGRhdGEuc3lzdGVtTWFuYWdlclJvbGUgfHwgJycsXG4gICAgICAgICAgaW52b2ljZXNBcHByb3ZlcjogZGF0YS5pbnZvaWNlc0FwcHJvdmVyIHx8ICcnLFxuICAgICAgICAgIHBvQXBwcm92ZXI6IGRhdGEucG9BcHByb3ZlciB8fCAnJyxcbiAgICAgICAgICBnb29kc1JlY2VpdmVyOiBkYXRhLmdvb2RzUmVjZWl2ZXIgfHwgJycsXG4gICAgICAgIH0sXG4gICAgICAgIGRlY2xhcmF0aW9uczoge1xuICAgICAgICAgIGluZm9BY2N1cmF0ZTogQm9vbGVhbihkYXRhLmRlY2xhcmF0aW9uSW5mb0FjY3VyYXRlKSxcbiAgICAgICAgICBhZ3JlZU9uYm9hcmRpbmc6IEJvb2xlYW4oZGF0YS5kZWNsYXJhdGlvbkFncmVlT25ib2FyZGluZyksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pXG5cbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBjbGVya0NsaWVudCgpXG4gICAgYXdhaXQgY2xpZW50LnVzZXJzLnVwZGF0ZVVzZXIodXNlcklkLCB7XG4gICAgICBwdWJsaWNNZXRhZGF0YToge1xuICAgICAgICByb2xlOiAnY29tcGFueScsXG4gICAgICAgIGNvbXBhbnlJZCxcbiAgICAgICAgb25ib2FyZGluZ1N0YXR1czogJ3BlbmRpbmdfYWRtaW5fYXBwcm92YWwnLFxuICAgICAgICBjb21wYW55OiB7XG4gICAgICAgICAgbmFtZTogZGF0YS5jb21wYW55TmFtZSxcbiAgICAgICAgICBpbmR1c3RyeTogZGF0YS5pbmR1c3RyeSB8fCAnJyxcbiAgICAgICAgICByZWdpb246IGRhdGEucmVnaW9uIHx8ICcnLFxuICAgICAgICAgIHNpemU6IGRhdGEuc2l6ZSB8fCAnJyxcbiAgICAgICAgICBjb250YWN0RW1haWw6IGRhdGEuY29udGFjdEVtYWlsIHx8ICcnLFxuICAgICAgICB9LFxuICAgICAgICBvbmJvYXJkZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9vbmJvYXJkaW5nJylcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBkYXRhOiB7IGNvbXBhbnlJZCB9IH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdGYWlsZWQgdG8gc3VibWl0IGNvbXBhbnkgb25ib2FyZGluZycgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdWJtaXRTdXBwbGllck9uYm9hcmRpbmcoZGF0YToge1xuICBuYW1lOiBzdHJpbmdcbiAgY29udGFjdFBlcnNvbj86IHN0cmluZ1xuICBwaG9uZT86IHN0cmluZ1xuICBlbWFpbD86IHN0cmluZ1xuICBnb29kc1R5cGU/OiBzdHJpbmdcbiAgcHJvZHVjdENhdGVnb3JpZXM/OiBzdHJpbmdbXVxuICBzdXBwbHlBcmVhcz86IHN0cmluZ1tdXG4gIGRlbGl2ZXJ5VGltZWxpbmU/OiBzdHJpbmdcbiAgcHJpY2VMaXN0VXBsb2Fkcz86IHsgbmFtZTogc3RyaW5nOyBzaXplOiBudW1iZXI7IHR5cGU6IHN0cmluZyB9W11cbiAgcmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVVcGxvYWRzPzogeyBuYW1lOiBzdHJpbmc7IHNpemU6IG51bWJlcjsgdHlwZTogc3RyaW5nIH1bXVxuICBiYW5rRGV0YWlscz86IHsgYmFua05hbWU/OiBzdHJpbmc7IGFjY291bnROYW1lPzogc3RyaW5nOyBhY2NvdW50TnVtYmVyPzogc3RyaW5nOyBwcmVmZXJzQ2FzaD86IGJvb2xlYW4gfVxuICBkZWNsYXJhdGlvbnM/OiB7IGluZm9BY2N1cmF0ZT86IGJvb2xlYW47IGFncmVlUnVsZXM/OiBib29sZWFuIH1cbiAgY2F0ZWdvcnk/OiBzdHJpbmdcbiAgcmVnaW9uPzogc3RyaW5nXG4gIHNlZ21lbnQ/OiBzdHJpbmdcbn0pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHVzZXJJZCB9ID0gYXdhaXQgYXV0aCgpXG4gICAgaWYgKCF1c2VySWQpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfVxuICAgIGF3YWl0IGRiQ29ubmVjdCgpXG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBTdXBwbGllci5jb3VudERvY3VtZW50cygpXG4gICAgY29uc3Qgc3VwcGxpZXJJZCA9IGBTVVAtJHsoY291bnQgKyA1MDAwKS50b1N0cmluZygpfWBcbiAgICBjb25zdCBzdXBwbGllciA9IGF3YWl0IFN1cHBsaWVyLmNyZWF0ZSh7XG4gICAgICBzdXBwbGllcklkLFxuICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgYXBwcm92ZWQ6IGZhbHNlLFxuICAgICAgb3duZXJVc2VySWQ6IHVzZXJJZCxcbiAgICAgIGNhdGVnb3J5OiBkYXRhLmNhdGVnb3J5IHx8ICdHZW5lcmFsJyxcbiAgICAgIHJlZ2lvbjogZGF0YS5yZWdpb24gfHwgJ0dsb2JhbCcsXG4gICAgICBzZWdtZW50OiBkYXRhLnNlZ21lbnQgfHwgJ1N0YW5kYXJkJyxcbiAgICAgIG9uYm9hcmRpbmc6IHtcbiAgICAgICAgY29udGFjdFBlcnNvbjogZGF0YS5jb250YWN0UGVyc29uIHx8ICcnLFxuICAgICAgICBwaG9uZTogZGF0YS5waG9uZSB8fCAnJyxcbiAgICAgICAgZW1haWw6IGRhdGEuZW1haWwgfHwgJycsXG4gICAgICAgIGdvb2RzVHlwZTogZGF0YS5nb29kc1R5cGUgfHwgJycsXG4gICAgICAgIHByb2R1Y3RDYXRlZ29yaWVzOiBBcnJheS5pc0FycmF5KGRhdGEucHJvZHVjdENhdGVnb3JpZXMpID8gZGF0YS5wcm9kdWN0Q2F0ZWdvcmllcyA6IFtdLFxuICAgICAgICBzdXBwbHlBcmVhczogQXJyYXkuaXNBcnJheShkYXRhLnN1cHBseUFyZWFzKSA/IGRhdGEuc3VwcGx5QXJlYXMgOiBbXSxcbiAgICAgICAgZGVsaXZlcnlUaW1lbGluZTogZGF0YS5kZWxpdmVyeVRpbWVsaW5lIHx8ICcnLFxuICAgICAgICBwcmljZUxpc3RVcGxvYWRzOiBBcnJheS5pc0FycmF5KGRhdGEucHJpY2VMaXN0VXBsb2FkcykgPyBkYXRhLnByaWNlTGlzdFVwbG9hZHMgOiBbXSxcbiAgICAgICAgcmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVVcGxvYWRzOiBBcnJheS5pc0FycmF5KGRhdGEucmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVVcGxvYWRzKSA/IGRhdGEucmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVVcGxvYWRzIDogW10sXG4gICAgICAgIGJhbmtEZXRhaWxzOiB7XG4gICAgICAgICAgYmFua05hbWU6IGRhdGEuYmFua0RldGFpbHM/LmJhbmtOYW1lIHx8ICcnLFxuICAgICAgICAgIGFjY291bnROYW1lOiBkYXRhLmJhbmtEZXRhaWxzPy5hY2NvdW50TmFtZSB8fCAnJyxcbiAgICAgICAgICBhY2NvdW50TnVtYmVyOiBkYXRhLmJhbmtEZXRhaWxzPy5hY2NvdW50TnVtYmVyIHx8ICcnLFxuICAgICAgICAgIHByZWZlcnNDYXNoOiBCb29sZWFuKGRhdGEuYmFua0RldGFpbHM/LnByZWZlcnNDYXNoKSxcbiAgICAgICAgfSxcbiAgICAgICAgZGVjbGFyYXRpb25zOiB7XG4gICAgICAgICAgaW5mb0FjY3VyYXRlOiBCb29sZWFuKGRhdGEuZGVjbGFyYXRpb25zPy5pbmZvQWNjdXJhdGUpLFxuICAgICAgICAgIGFncmVlUnVsZXM6IEJvb2xlYW4oZGF0YS5kZWNsYXJhdGlvbnM/LmFncmVlUnVsZXMpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHBlcmZvcm1hbmNlU2NvcmU6IDAsXG4gICAgICByaXNrUmF0aW5nOiAnTG93JyxcbiAgICAgIHRvdGFsU3BlbmQ6IDAsXG4gICAgfSlcblxuICAgIGNvbnN0IGNsaWVudDIgPSBhd2FpdCBjbGVya0NsaWVudCgpXG4gICAgYXdhaXQgY2xpZW50Mi51c2Vycy51cGRhdGVVc2VyKHVzZXJJZCwge1xuICAgICAgcHVibGljTWV0YWRhdGE6IHtcbiAgICAgICAgcm9sZTogJ3N1cHBsaWVyJyxcbiAgICAgICAgc3VwcGxpZXJJZCxcbiAgICAgICAgb25ib2FyZGluZ1N0YXR1czogJ3BlbmRpbmdfYWRtaW5fYXBwcm92YWwnLFxuICAgICAgICBvbmJvYXJkZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9vbmJvYXJkaW5nJylcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHN1cHBsaWVyKSkgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhaWxlZCB0byBzdWJtaXQgc3VwcGxpZXIgb25ib2FyZGluZycgfVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6ImtUQVFzQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/actions/data:30cdc0 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40b533b5a49f64416e62ca9e75858712f207a9ba1d":"submitSupplierOnboarding"},"lib/actions/onboarding-actions.ts",""] */ __turbopack_context__.s([
    "submitSupplierOnboarding",
    ()=>submitSupplierOnboarding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var submitSupplierOnboarding = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40b533b5a49f64416e62ca9e75858712f207a9ba1d", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "submitSupplierOnboarding"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vb25ib2FyZGluZy1hY3Rpb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc2VydmVyJ1xuXG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gJ25leHQvY2FjaGUnXG5pbXBvcnQgeyBhdXRoLCBjbGVya0NsaWVudCB9IGZyb20gJ0BjbGVyay9uZXh0anMvc2VydmVyJ1xuaW1wb3J0IGRiQ29ubmVjdCBmcm9tICdAL2xpYi9tb25nb2RiJ1xuaW1wb3J0IHsgU3VwcGxpZXIgfSBmcm9tICcuLi9tb2RlbHMvU3VwcGxpZXInXG5pbXBvcnQgeyBDb21wYW55IH0gZnJvbSAnLi4vbW9kZWxzL0NvbXBhbnknXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdWJtaXRDb21wYW55T25ib2FyZGluZyhkYXRhOiB7XG4gIGNvbXBhbnlOYW1lOiBzdHJpbmdcbiAgaW5kdXN0cnk/OiBzdHJpbmdcbiAgcmVnaW9uPzogc3RyaW5nXG4gIHNpemU/OiBzdHJpbmdcbiAgY29udGFjdEVtYWlsPzogc3RyaW5nXG4gIG9yZ2FuaXphdGlvblR5cGU/OiBzdHJpbmdcbiAgYWRkcmVzcz86IHN0cmluZ1xuICBvZmZpY2lhbEVtYWlsPzogc3RyaW5nXG4gIGNvbXBhbnlQaG9uZT86IHN0cmluZ1xuICB3ZWJzaXRlPzogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb25OYW1lPzogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb25Sb2xlPzogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb25QaG9uZT86IHN0cmluZ1xuICBjb250YWN0UGVyc29uRW1haWw/OiBzdHJpbmdcbiAgYnVzaW5lc3NEZXNjcmlwdGlvbj86IHN0cmluZ1xuICBicmFuY2hlc0NvdW50Pzogc3RyaW5nXG4gIGJyYW5jaExvY2F0aW9ucz86IHN0cmluZ1xuICBjZW50cmFsU3RvcmU/OiBzdHJpbmdcbiAgcHJvY3VyZW1lbnRNZXRob2Q/OiBzdHJpbmdcbiAgcmVxdWlyZXNBcHByb3ZhbFdvcmtmbG93cz86IGJvb2xlYW5cbiAgYXBwcm92YWxMZXZlbHM/OiBzdHJpbmdbXVxuICBtYW5hZ2VyTmFtZT86IHN0cmluZ1xuICBtYW5hZ2VyUG9zaXRpb24/OiBzdHJpbmdcbiAgbWFuYWdlckVtYWlsPzogc3RyaW5nXG4gIGVtcGxveWVlQWNjZXNzQ291bnQ/OiBzdHJpbmdcbiAgZGVwYXJ0bWVudHM/OiBzdHJpbmdbXVxuICBvdGhlckRlcGFydG1lbnQ/OiBzdHJpbmdcbiAgcmVnaXN0cmF0aW9uVXBsb2Fkcz86IHsgbmFtZTogc3RyaW5nOyBzaXplOiBudW1iZXI7IHR5cGU6IHN0cmluZyB9W11cbiAgdGluPzogc3RyaW5nXG4gIGxvZ29VcGxvYWRzPzogeyBuYW1lOiBzdHJpbmc7IHNpemU6IG51bWJlcjsgdHlwZTogc3RyaW5nIH1bXVxuICB2ZW5kb3JzU2VsZk9uYm9hcmQ/OiBzdHJpbmdcbiAgdGVuZGVyaW5nRW5hYmxlZD86IGJvb2xlYW5cbiAgZUludm9pY2luZ0VuYWJsZWQ/OiBib29sZWFuXG4gIGFuYWx5dGljc0VuYWJsZWQ/OiBib29sZWFuXG4gIHN5c3RlbU1hbmFnZXJOYW1lPzogc3RyaW5nXG4gIHN5c3RlbU1hbmFnZXJSb2xlPzogc3RyaW5nXG4gIGludm9pY2VzQXBwcm92ZXI/OiBzdHJpbmdcbiAgcG9BcHByb3Zlcj86IHN0cmluZ1xuICBnb29kc1JlY2VpdmVyPzogc3RyaW5nXG4gIGRlY2xhcmF0aW9uSW5mb0FjY3VyYXRlPzogYm9vbGVhblxuICBkZWNsYXJhdGlvbkFncmVlT25ib2FyZGluZz86IGJvb2xlYW5cbn0pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHVzZXJJZCB9ID0gYXdhaXQgYXV0aCgpXG4gICAgaWYgKCF1c2VySWQpIHtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfVxuICAgIH1cblxuICAgIGF3YWl0IGRiQ29ubmVjdCgpXG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBDb21wYW55LmNvdW50RG9jdW1lbnRzKClcbiAgICBjb25zdCBjb21wYW55SWQgPSBgQ09NUC0keyhjb3VudCArIDEwMDApLnRvU3RyaW5nKCl9YFxuXG4gICAgYXdhaXQgQ29tcGFueS5jcmVhdGUoe1xuICAgICAgY29tcGFueUlkLFxuICAgICAgbmFtZTogZGF0YS5jb21wYW55TmFtZSxcbiAgICAgIGFwcHJvdmVkOiBmYWxzZSxcbiAgICAgIGluZHVzdHJ5OiBkYXRhLmluZHVzdHJ5IHx8ICcnLFxuICAgICAgcmVnaW9uOiBkYXRhLnJlZ2lvbiB8fCAnJyxcbiAgICAgIHNpemU6IGRhdGEuc2l6ZSB8fCAnJyxcbiAgICAgIGNvbnRhY3RFbWFpbDogZGF0YS5jb250YWN0RW1haWwgfHwgJycsXG4gICAgICBvd25lclVzZXJJZDogdXNlcklkLFxuICAgICAgb25ib2FyZGluZzoge1xuICAgICAgICBjb21wYW55SW5mb3JtYXRpb246IHtcbiAgICAgICAgICBvcmdhbml6YXRpb25UeXBlOiBkYXRhLm9yZ2FuaXphdGlvblR5cGUgfHwgJycsXG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzIHx8ICcnLFxuICAgICAgICAgIG9mZmljaWFsRW1haWw6IGRhdGEub2ZmaWNpYWxFbWFpbCB8fCAnJyxcbiAgICAgICAgICBwaG9uZTogZGF0YS5jb21wYW55UGhvbmUgfHwgJycsXG4gICAgICAgICAgd2Vic2l0ZTogZGF0YS53ZWJzaXRlIHx8ICcnLFxuICAgICAgICB9LFxuICAgICAgICBjb250YWN0UGVyc29uOiB7XG4gICAgICAgICAgbmFtZTogZGF0YS5jb250YWN0UGVyc29uTmFtZSB8fCAnJyxcbiAgICAgICAgICByb2xlOiBkYXRhLmNvbnRhY3RQZXJzb25Sb2xlIHx8ICcnLFxuICAgICAgICAgIHBob25lOiBkYXRhLmNvbnRhY3RQZXJzb25QaG9uZSB8fCAnJyxcbiAgICAgICAgICBlbWFpbDogZGF0YS5jb250YWN0UGVyc29uRW1haWwgfHwgJycsXG4gICAgICAgIH0sXG4gICAgICAgIGJ1c2luZXNzT3BlcmF0aW9uczoge1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmJ1c2luZXNzRGVzY3JpcHRpb24gfHwgJycsXG4gICAgICAgICAgYnJhbmNoZXNDb3VudDogZGF0YS5icmFuY2hlc0NvdW50IHx8ICcnLFxuICAgICAgICAgIGJyYW5jaExvY2F0aW9uczogZGF0YS5icmFuY2hMb2NhdGlvbnMgfHwgJycsXG4gICAgICAgICAgY2VudHJhbFN0b3JlOiBkYXRhLmNlbnRyYWxTdG9yZSB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgcHJvY3VyZW1lbnRTdHJ1Y3R1cmU6IHtcbiAgICAgICAgICBjdXJyZW50TWV0aG9kOiBkYXRhLnByb2N1cmVtZW50TWV0aG9kIHx8ICcnLFxuICAgICAgICAgIHJlcXVpcmVzQXBwcm92YWxXb3JrZmxvd3M6IEJvb2xlYW4oZGF0YS5yZXF1aXJlc0FwcHJvdmFsV29ya2Zsb3dzKSxcbiAgICAgICAgICBhcHByb3ZhbExldmVsczogQXJyYXkuaXNBcnJheShkYXRhLmFwcHJvdmFsTGV2ZWxzKSA/IGRhdGEuYXBwcm92YWxMZXZlbHMgOiBbXSxcbiAgICAgICAgICBtYW5hZ2VyOiB7XG4gICAgICAgICAgICBuYW1lOiBkYXRhLm1hbmFnZXJOYW1lIHx8ICcnLFxuICAgICAgICAgICAgcG9zaXRpb246IGRhdGEubWFuYWdlclBvc2l0aW9uIHx8ICcnLFxuICAgICAgICAgICAgZW1haWw6IGRhdGEubWFuYWdlckVtYWlsIHx8ICcnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHVzZXJTZXR1cDoge1xuICAgICAgICAgIGVtcGxveWVlQWNjZXNzQ291bnQ6IGRhdGEuZW1wbG95ZWVBY2Nlc3NDb3VudCB8fCAnJyxcbiAgICAgICAgICBkZXBhcnRtZW50czogQXJyYXkuaXNBcnJheShkYXRhLmRlcGFydG1lbnRzKSA/IGRhdGEuZGVwYXJ0bWVudHMgOiBbXSxcbiAgICAgICAgICBvdGhlckRlcGFydG1lbnQ6IGRhdGEub3RoZXJEZXBhcnRtZW50IHx8ICcnLFxuICAgICAgICB9LFxuICAgICAgICBkb2N1bWVudHM6IHtcbiAgICAgICAgICByZWdpc3RyYXRpb25VcGxvYWRzOiBBcnJheS5pc0FycmF5KGRhdGEucmVnaXN0cmF0aW9uVXBsb2FkcykgPyBkYXRhLnJlZ2lzdHJhdGlvblVwbG9hZHMgOiBbXSxcbiAgICAgICAgICB0aW46IGRhdGEudGluIHx8ICcnLFxuICAgICAgICAgIGxvZ29VcGxvYWRzOiBBcnJheS5pc0FycmF5KGRhdGEubG9nb1VwbG9hZHMpID8gZGF0YS5sb2dvVXBsb2FkcyA6IFtdLFxuICAgICAgICB9LFxuICAgICAgICBzeXN0ZW1Db25maWd1cmF0aW9uOiB7XG4gICAgICAgICAgdmVuZG9yc1NlbGZPbmJvYXJkOiBkYXRhLnZlbmRvcnNTZWxmT25ib2FyZCB8fCAnJyxcbiAgICAgICAgICB0ZW5kZXJpbmdFbmFibGVkOiBCb29sZWFuKGRhdGEudGVuZGVyaW5nRW5hYmxlZCksXG4gICAgICAgICAgZUludm9pY2luZ0VuYWJsZWQ6IEJvb2xlYW4oZGF0YS5lSW52b2ljaW5nRW5hYmxlZCksXG4gICAgICAgICAgYW5hbHl0aWNzRW5hYmxlZDogQm9vbGVhbihkYXRhLmFuYWx5dGljc0VuYWJsZWQpLFxuICAgICAgICB9LFxuICAgICAgICByZXNwb25zaWJpbGl0aWVzOiB7XG4gICAgICAgICAgc3lzdGVtTWFuYWdlck5hbWU6IGRhdGEuc3lzdGVtTWFuYWdlck5hbWUgfHwgJycsXG4gICAgICAgICAgc3lzdGVtTWFuYWdlclJvbGU6IGRhdGEuc3lzdGVtTWFuYWdlclJvbGUgfHwgJycsXG4gICAgICAgICAgaW52b2ljZXNBcHByb3ZlcjogZGF0YS5pbnZvaWNlc0FwcHJvdmVyIHx8ICcnLFxuICAgICAgICAgIHBvQXBwcm92ZXI6IGRhdGEucG9BcHByb3ZlciB8fCAnJyxcbiAgICAgICAgICBnb29kc1JlY2VpdmVyOiBkYXRhLmdvb2RzUmVjZWl2ZXIgfHwgJycsXG4gICAgICAgIH0sXG4gICAgICAgIGRlY2xhcmF0aW9uczoge1xuICAgICAgICAgIGluZm9BY2N1cmF0ZTogQm9vbGVhbihkYXRhLmRlY2xhcmF0aW9uSW5mb0FjY3VyYXRlKSxcbiAgICAgICAgICBhZ3JlZU9uYm9hcmRpbmc6IEJvb2xlYW4oZGF0YS5kZWNsYXJhdGlvbkFncmVlT25ib2FyZGluZyksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pXG5cbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBjbGVya0NsaWVudCgpXG4gICAgYXdhaXQgY2xpZW50LnVzZXJzLnVwZGF0ZVVzZXIodXNlcklkLCB7XG4gICAgICBwdWJsaWNNZXRhZGF0YToge1xuICAgICAgICByb2xlOiAnY29tcGFueScsXG4gICAgICAgIGNvbXBhbnlJZCxcbiAgICAgICAgb25ib2FyZGluZ1N0YXR1czogJ3BlbmRpbmdfYWRtaW5fYXBwcm92YWwnLFxuICAgICAgICBjb21wYW55OiB7XG4gICAgICAgICAgbmFtZTogZGF0YS5jb21wYW55TmFtZSxcbiAgICAgICAgICBpbmR1c3RyeTogZGF0YS5pbmR1c3RyeSB8fCAnJyxcbiAgICAgICAgICByZWdpb246IGRhdGEucmVnaW9uIHx8ICcnLFxuICAgICAgICAgIHNpemU6IGRhdGEuc2l6ZSB8fCAnJyxcbiAgICAgICAgICBjb250YWN0RW1haWw6IGRhdGEuY29udGFjdEVtYWlsIHx8ICcnLFxuICAgICAgICB9LFxuICAgICAgICBvbmJvYXJkZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9vbmJvYXJkaW5nJylcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBkYXRhOiB7IGNvbXBhbnlJZCB9IH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdGYWlsZWQgdG8gc3VibWl0IGNvbXBhbnkgb25ib2FyZGluZycgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdWJtaXRTdXBwbGllck9uYm9hcmRpbmcoZGF0YToge1xuICBuYW1lOiBzdHJpbmdcbiAgY29udGFjdFBlcnNvbj86IHN0cmluZ1xuICBwaG9uZT86IHN0cmluZ1xuICBlbWFpbD86IHN0cmluZ1xuICBnb29kc1R5cGU/OiBzdHJpbmdcbiAgcHJvZHVjdENhdGVnb3JpZXM/OiBzdHJpbmdbXVxuICBzdXBwbHlBcmVhcz86IHN0cmluZ1tdXG4gIGRlbGl2ZXJ5VGltZWxpbmU/OiBzdHJpbmdcbiAgcHJpY2VMaXN0VXBsb2Fkcz86IHsgbmFtZTogc3RyaW5nOyBzaXplOiBudW1iZXI7IHR5cGU6IHN0cmluZyB9W11cbiAgcmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVVcGxvYWRzPzogeyBuYW1lOiBzdHJpbmc7IHNpemU6IG51bWJlcjsgdHlwZTogc3RyaW5nIH1bXVxuICBiYW5rRGV0YWlscz86IHsgYmFua05hbWU/OiBzdHJpbmc7IGFjY291bnROYW1lPzogc3RyaW5nOyBhY2NvdW50TnVtYmVyPzogc3RyaW5nOyBwcmVmZXJzQ2FzaD86IGJvb2xlYW4gfVxuICBkZWNsYXJhdGlvbnM/OiB7IGluZm9BY2N1cmF0ZT86IGJvb2xlYW47IGFncmVlUnVsZXM/OiBib29sZWFuIH1cbiAgY2F0ZWdvcnk/OiBzdHJpbmdcbiAgcmVnaW9uPzogc3RyaW5nXG4gIHNlZ21lbnQ/OiBzdHJpbmdcbn0pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHVzZXJJZCB9ID0gYXdhaXQgYXV0aCgpXG4gICAgaWYgKCF1c2VySWQpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfVxuICAgIGF3YWl0IGRiQ29ubmVjdCgpXG4gICAgY29uc3QgY291bnQgPSBhd2FpdCBTdXBwbGllci5jb3VudERvY3VtZW50cygpXG4gICAgY29uc3Qgc3VwcGxpZXJJZCA9IGBTVVAtJHsoY291bnQgKyA1MDAwKS50b1N0cmluZygpfWBcbiAgICBjb25zdCBzdXBwbGllciA9IGF3YWl0IFN1cHBsaWVyLmNyZWF0ZSh7XG4gICAgICBzdXBwbGllcklkLFxuICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgYXBwcm92ZWQ6IGZhbHNlLFxuICAgICAgb3duZXJVc2VySWQ6IHVzZXJJZCxcbiAgICAgIGNhdGVnb3J5OiBkYXRhLmNhdGVnb3J5IHx8ICdHZW5lcmFsJyxcbiAgICAgIHJlZ2lvbjogZGF0YS5yZWdpb24gfHwgJ0dsb2JhbCcsXG4gICAgICBzZWdtZW50OiBkYXRhLnNlZ21lbnQgfHwgJ1N0YW5kYXJkJyxcbiAgICAgIG9uYm9hcmRpbmc6IHtcbiAgICAgICAgY29udGFjdFBlcnNvbjogZGF0YS5jb250YWN0UGVyc29uIHx8ICcnLFxuICAgICAgICBwaG9uZTogZGF0YS5waG9uZSB8fCAnJyxcbiAgICAgICAgZW1haWw6IGRhdGEuZW1haWwgfHwgJycsXG4gICAgICAgIGdvb2RzVHlwZTogZGF0YS5nb29kc1R5cGUgfHwgJycsXG4gICAgICAgIHByb2R1Y3RDYXRlZ29yaWVzOiBBcnJheS5pc0FycmF5KGRhdGEucHJvZHVjdENhdGVnb3JpZXMpID8gZGF0YS5wcm9kdWN0Q2F0ZWdvcmllcyA6IFtdLFxuICAgICAgICBzdXBwbHlBcmVhczogQXJyYXkuaXNBcnJheShkYXRhLnN1cHBseUFyZWFzKSA/IGRhdGEuc3VwcGx5QXJlYXMgOiBbXSxcbiAgICAgICAgZGVsaXZlcnlUaW1lbGluZTogZGF0YS5kZWxpdmVyeVRpbWVsaW5lIHx8ICcnLFxuICAgICAgICBwcmljZUxpc3RVcGxvYWRzOiBBcnJheS5pc0FycmF5KGRhdGEucHJpY2VMaXN0VXBsb2FkcykgPyBkYXRhLnByaWNlTGlzdFVwbG9hZHMgOiBbXSxcbiAgICAgICAgcmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVVcGxvYWRzOiBBcnJheS5pc0FycmF5KGRhdGEucmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVVcGxvYWRzKSA/IGRhdGEucmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVVcGxvYWRzIDogW10sXG4gICAgICAgIGJhbmtEZXRhaWxzOiB7XG4gICAgICAgICAgYmFua05hbWU6IGRhdGEuYmFua0RldGFpbHM/LmJhbmtOYW1lIHx8ICcnLFxuICAgICAgICAgIGFjY291bnROYW1lOiBkYXRhLmJhbmtEZXRhaWxzPy5hY2NvdW50TmFtZSB8fCAnJyxcbiAgICAgICAgICBhY2NvdW50TnVtYmVyOiBkYXRhLmJhbmtEZXRhaWxzPy5hY2NvdW50TnVtYmVyIHx8ICcnLFxuICAgICAgICAgIHByZWZlcnNDYXNoOiBCb29sZWFuKGRhdGEuYmFua0RldGFpbHM/LnByZWZlcnNDYXNoKSxcbiAgICAgICAgfSxcbiAgICAgICAgZGVjbGFyYXRpb25zOiB7XG4gICAgICAgICAgaW5mb0FjY3VyYXRlOiBCb29sZWFuKGRhdGEuZGVjbGFyYXRpb25zPy5pbmZvQWNjdXJhdGUpLFxuICAgICAgICAgIGFncmVlUnVsZXM6IEJvb2xlYW4oZGF0YS5kZWNsYXJhdGlvbnM/LmFncmVlUnVsZXMpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHBlcmZvcm1hbmNlU2NvcmU6IDAsXG4gICAgICByaXNrUmF0aW5nOiAnTG93JyxcbiAgICAgIHRvdGFsU3BlbmQ6IDAsXG4gICAgfSlcblxuICAgIGNvbnN0IGNsaWVudDIgPSBhd2FpdCBjbGVya0NsaWVudCgpXG4gICAgYXdhaXQgY2xpZW50Mi51c2Vycy51cGRhdGVVc2VyKHVzZXJJZCwge1xuICAgICAgcHVibGljTWV0YWRhdGE6IHtcbiAgICAgICAgcm9sZTogJ3N1cHBsaWVyJyxcbiAgICAgICAgc3VwcGxpZXJJZCxcbiAgICAgICAgb25ib2FyZGluZ1N0YXR1czogJ3BlbmRpbmdfYWRtaW5fYXBwcm92YWwnLFxuICAgICAgICBvbmJvYXJkZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9vbmJvYXJkaW5nJylcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHN1cHBsaWVyKSkgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhaWxlZCB0byBzdWJtaXQgc3VwcGxpZXIgb25ib2FyZGluZycgfVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Im1UQTBKc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(onboard)/onboarding/OnboardingContent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OnboardingContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/status-badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$56d78d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/lib/actions/data:56d78d [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$30cdc0__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/lib/actions/data:30cdc0 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function OnboardingContent() {
    _s();
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [companyName, setCompanyName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [industry, setIndustry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [region, setRegion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [size, setSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [contactEmail, setContactEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [organizationType, setOrganizationType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [businessAddress, setBusinessAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [companyOfficialEmail, setCompanyOfficialEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [companyPhone, setCompanyPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [website, setWebsite] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [primaryContactName, setPrimaryContactName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [primaryContactRole, setPrimaryContactRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [primaryContactPhone, setPrimaryContactPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [primaryContactEmail, setPrimaryContactEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [businessDescription, setBusinessDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [branchesCount, setBranchesCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [branchLocations, setBranchLocations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [centralStore, setCentralStore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [procurementMethod, setProcurementMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [requiresApprovalWorkflows, setRequiresApprovalWorkflows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [approvalLevels, setApprovalLevels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [managerName, setManagerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [managerPosition, setManagerPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [managerEmail, setManagerEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [employeeAccessCount, setEmployeeAccessCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [departments, setDepartments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [otherDepartment, setOtherDepartment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [registrationUploads, setRegistrationUploads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tin, setTin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [logoUploads, setLogoUploads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [vendorsSelfOnboard, setVendorsSelfOnboard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [tenderingEnabled, setTenderingEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [eInvoicingEnabled, setEInvoicingEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [analyticsEnabled, setAnalyticsEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [systemManagerName, setSystemManagerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [systemManagerRole, setSystemManagerRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [invoicesApprover, setInvoicesApprover] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [poApprover, setPoApprover] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [goodsReceiver, setGoodsReceiver] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [declCompanyInfoAccurate, setDeclCompanyInfoAccurate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [declCompanyAgree, setDeclCompanyAgree] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [supplierName, setSupplierName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [contactPerson, setContactPerson] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [goodsType, setGoodsType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [productCategories, setProductCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [supplyAreas, setSupplyAreas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [deliveryTimeline, setDeliveryTimeline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [priceListFiles, setPriceListFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [registrationFiles, setRegistrationFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [bankName, setBankName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [accountName, setAccountName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [accountNumber, setAccountNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [prefersCash, setPrefersCash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [declInfoAccurate, setDeclInfoAccurate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [declAgreeRules, setDeclAgreeRules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
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
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$56d78d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["submitCompanyOnboarding"])({
            companyName,
            industry,
            region,
            size,
            contactEmail,
            organizationType,
            address: businessAddress,
            officialEmail: companyOfficialEmail,
            companyPhone,
            website,
            contactPersonName: primaryContactName,
            contactPersonRole: primaryContactRole,
            contactPersonPhone: primaryContactPhone,
            contactPersonEmail: primaryContactEmail,
            businessDescription,
            branchesCount,
            branchLocations,
            centralStore,
            procurementMethod,
            requiresApprovalWorkflows,
            approvalLevels,
            managerName,
            managerPosition,
            managerEmail,
            employeeAccessCount,
            departments,
            otherDepartment,
            registrationUploads: regUploads,
            tin,
            logoUploads: logos,
            vendorsSelfOnboard,
            tenderingEnabled,
            eInvoicingEnabled,
            analyticsEnabled,
            systemManagerName,
            systemManagerRole,
            invoicesApprover,
            poApprover,
            goodsReceiver,
            declarationInfoAccurate: declCompanyInfoAccurate,
            declarationAgreeOnboarding: declCompanyAgree
        });
        setLoading(null);
        if (res && res.success) router.push("/onboarding/submitted?type=company");
    };
    const submitSupplier = async ()=>{
        setLoading("supplier");
        const priceUploads = priceListFiles ? Array.from(priceListFiles).map((f)=>({
                name: f.name,
                size: f.size,
                type: f.type
            })) : [];
        const regUploads = registrationFiles ? Array.from(registrationFiles).map((f)=>({
                name: f.name,
                size: f.size,
                type: f.type
            })) : [];
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$30cdc0__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["submitSupplierOnboarding"])({
            name: supplierName,
            contactPerson,
            phone,
            email,
            goodsType,
            productCategories,
            supplyAreas,
            deliveryTimeline,
            priceListUploads: priceUploads,
            registrationCertificateUploads: regUploads,
            bankDetails: {
                bankName,
                accountName,
                accountNumber,
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-muted/30 p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-2xl",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "text-base",
                                            children: "Welcome"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 156,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                            className: "text-xs",
                                            children: "Select your role and complete onboarding."
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 157,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 155,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                    status: role ? role : "Select role"
                                }, void 0, false, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 159,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                            lineNumber: 154,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: !role ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>setRole("company"),
                                    children: "I am a company"
                                }, void 0, false, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 165,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>setRole("supplier"),
                                    children: "I am a supplier"
                                }, void 0, false, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 166,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                            lineNumber: 164,
                            columnNumber: 15
                        }, this) : role === "company" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Company name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 171,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: companyName,
                                            onChange: (e)=>setCompanyName(e.target.value),
                                            placeholder: "Acme Corp"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 172,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 170,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Type of organization"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 175,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: organizationType,
                                            onChange: (e)=>setOrganizationType(e.target.value),
                                            placeholder: "Sole Proprietor / Ltd / NGO / Government / Other"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 176,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 174,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Business address"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 179,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: businessAddress,
                                            onChange: (e)=>setBusinessAddress(e.target.value),
                                            placeholder: "Address"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 180,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 178,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Official email address"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: companyOfficialEmail,
                                                    onChange: (e)=>setCompanyOfficialEmail(e.target.value),
                                                    placeholder: "info@company.com"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 183,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Company phone / WhatsApp"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: companyPhone,
                                                    onChange: (e)=>setCompanyPhone(e.target.value),
                                                    placeholder: "+232 76 123 456"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 187,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 182,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Website (optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 193,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: website,
                                            onChange: (e)=>setWebsite(e.target.value),
                                            placeholder: "https://"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 194,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 192,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Industry"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 198,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: industry,
                                                    onChange: (e)=>setIndustry(e.target.value),
                                                    placeholder: "Manufacturing"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 197,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Region"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: region,
                                                    onChange: (e)=>setRegion(e.target.value),
                                                    placeholder: "Global HQ"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 203,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 201,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 196,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Company size"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: size,
                                                    onChange: (e)=>setSize(e.target.value),
                                                    placeholder: "500+"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 207,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Contact email"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: contactEmail,
                                                    onChange: (e)=>setContactEmail(e.target.value),
                                                    placeholder: "admin@company.com"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 213,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 211,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 206,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Primary contact person name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 217,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: primaryContactName,
                                            onChange: (e)=>setPrimaryContactName(e.target.value),
                                            placeholder: "Jane Doe"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 218,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 216,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: primaryContactRole,
                                            onChange: (e)=>setPrimaryContactRole(e.target.value),
                                            placeholder: "Position/role"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 221,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: primaryContactPhone,
                                            onChange: (e)=>setPrimaryContactPhone(e.target.value),
                                            placeholder: "Phone / WhatsApp"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 222,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: primaryContactEmail,
                                            onChange: (e)=>setPrimaryContactEmail(e.target.value),
                                            placeholder: "Email"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 223,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 220,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "What does your company do?"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 226,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: businessDescription,
                                            onChange: (e)=>setBusinessDescription(e.target.value),
                                            placeholder: "Brief description"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 227,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 225,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "How many branches do you have?"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 230,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-3 text-xs",
                                            children: [
                                                "1",
                                                "2–5",
                                                "6–10",
                                                "10+"
                                            ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            name: "branches_count",
                                                            checked: branchesCount === opt,
                                                            onChange: ()=>setBranchesCount(opt)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                            lineNumber: 234,
                                                            columnNumber: 25
                                                        }, this),
                                                        opt
                                                    ]
                                                }, opt, true, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 233,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 231,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 229,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "List your branch locations"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 241,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: branchLocations,
                                            onChange: (e)=>setBranchLocations(e.target.value),
                                            placeholder: "Comma separated"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 242,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 240,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Do you have a central store/warehouse?"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 245,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-3 text-xs",
                                            children: [
                                                "Yes",
                                                "No",
                                                "Planning to set up"
                                            ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            name: "central_store",
                                                            checked: centralStore === opt,
                                                            onChange: ()=>setCentralStore(opt)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                            lineNumber: 249,
                                                            columnNumber: 25
                                                        }, this),
                                                        opt
                                                    ]
                                                }, opt, true, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 246,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 244,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "How does your company currently handle procurement?"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 256,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-3 text-xs",
                                            children: [
                                                "Manual (Paper/WhatsApp)",
                                                "Excel or Google Sheets",
                                                "Partially digital",
                                                "Fully digital"
                                            ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            name: "proc_method",
                                                            checked: procurementMethod === opt,
                                                            onChange: ()=>setProcurementMethod(opt)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                            lineNumber: 260,
                                                            columnNumber: 25
                                                        }, this),
                                                        opt
                                                    ]
                                                }, opt, true, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 23
                                                }, this))
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Do you require approval workflows?"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 267,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: requiresApprovalWorkflows,
                                                    onChange: (e)=>setRequiresApprovalWorkflows(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 269,
                                                    columnNumber: 21
                                                }, this),
                                                "Yes"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 268,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
                                            children: [
                                                "Supervisor → Procurement",
                                                "Department Head → Finance",
                                                "Multi-Level (Custom)"
                                            ].map((level)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2 text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: approvalLevels.includes(level),
                                                            onChange: (e)=>setApprovalLevels((prev)=>e.target.checked ? [
                                                                        ...prev,
                                                                        level
                                                                    ] : prev.filter((l)=>l !== level))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 25
                                                        }, this),
                                                        level
                                                    ]
                                                }, level, true, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 272,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 266,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: managerName,
                                            onChange: (e)=>setManagerName(e.target.value),
                                            placeholder: "Manager name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 286,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: managerPosition,
                                            onChange: (e)=>setManagerPosition(e.target.value),
                                            placeholder: "Position"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 287,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: managerEmail,
                                            onChange: (e)=>setManagerEmail(e.target.value),
                                            placeholder: "Email"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 288,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 285,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "How many employees will need login access?"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 291,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-3 text-xs",
                                            children: [
                                                "1–5",
                                                "6–20",
                                                "21–50",
                                                "51–100",
                                                "100+"
                                            ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            name: "employee_access",
                                                            checked: employeeAccessCount === opt,
                                                            onChange: ()=>setEmployeeAccessCount(opt)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                            lineNumber: 295,
                                                            columnNumber: 25
                                                        }, this),
                                                        opt
                                                    ]
                                                }, opt, true, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 292,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 290,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "List departments involved in procurement"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 302,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
                                            children: [
                                                "Procurement",
                                                "Finance",
                                                "Warehousing / Store",
                                                "Each Branch",
                                                "Management",
                                                "Others (specify)"
                                            ].map((dep)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2 text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: departments.includes(dep),
                                                            onChange: (e)=>setDepartments((prev)=>e.target.checked ? [
                                                                        ...prev,
                                                                        dep
                                                                    ] : prev.filter((d)=>d !== dep))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 25
                                                        }, this),
                                                        dep
                                                    ]
                                                }, dep, true, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 305,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 303,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: otherDepartment,
                                            onChange: (e)=>setOtherDepartment(e.target.value),
                                            placeholder: "If others, specify"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 311,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 301,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Documents (optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 314,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "file",
                                            multiple: true,
                                            accept: "image/*,.pdf",
                                            onChange: (e)=>setRegistrationUploads(e.target.files)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 315,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: tin,
                                            onChange: (e)=>setTin(e.target.value),
                                            placeholder: "Tax Identification Number (TIN)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 316,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "file",
                                            multiple: true,
                                            accept: "image/*,.pdf,.svg,.png,.jpg",
                                            onChange: (e)=>setLogoUploads(e.target.files)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 317,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 313,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Do you want vendors to onboard themselves?"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 320,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-3 text-xs",
                                            children: [
                                                "Yes",
                                                "No",
                                                "Both"
                                            ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            name: "vendors_self_onboard",
                                                            checked: vendorsSelfOnboard === opt,
                                                            onChange: ()=>setVendorsSelfOnboard(opt)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                            lineNumber: 324,
                                                            columnNumber: 25
                                                        }, this),
                                                        opt
                                                    ]
                                                }, opt, true, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 323,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: tenderingEnabled,
                                                    onChange: (e)=>setTenderingEnabled(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 331,
                                                    columnNumber: 70
                                                }, this),
                                                " Bidding/tendering enabled"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 331,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: eInvoicingEnabled,
                                                    onChange: (e)=>setEInvoicingEnabled(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 332,
                                                    columnNumber: 70
                                                }, this),
                                                " E-invoicing enabled"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 332,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: analyticsEnabled,
                                                    onChange: (e)=>setAnalyticsEnabled(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 333,
                                                    columnNumber: 70
                                                }, this),
                                                " Analytics enabled"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 333,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 330,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: systemManagerName,
                                            onChange: (e)=>setSystemManagerName(e.target.value),
                                            placeholder: "System manager name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 336,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: systemManagerRole,
                                            onChange: (e)=>setSystemManagerRole(e.target.value),
                                            placeholder: "Role"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 337,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: invoicesApprover,
                                            onChange: (e)=>setInvoicesApprover(e.target.value),
                                            placeholder: "Who approves invoices"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 338,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 335,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: poApprover,
                                            onChange: (e)=>setPoApprover(e.target.value),
                                            placeholder: "Who approves purchase orders"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 341,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: goodsReceiver,
                                            onChange: (e)=>setGoodsReceiver(e.target.value),
                                            placeholder: "Who receives goods"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 342,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 340,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Responsibilities & agreement"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 345,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: declCompanyInfoAccurate,
                                                    onChange: (e)=>setDeclCompanyInfoAccurate(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 70
                                                }, this),
                                                " I confirm the information provided is accurate."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 346,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: declCompanyAgree,
                                                    onChange: (e)=>setDeclCompanyAgree(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 70
                                                }, this),
                                                " I agree for my company to onboard onto the e-Procurement platform."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 347,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 344,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 pt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            onClick: ()=>setRole(null),
                                            className: "flex-1",
                                            children: "Back"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 350,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: submitCompany,
                                            className: "flex-1",
                                            disabled: !companyName || !declCompanyInfoAccurate || !declCompanyAgree || loading !== null,
                                            children: loading === "company" ? "Submitting..." : "Submit"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 351,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 349,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                            lineNumber: 169,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Supplier name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 357,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: supplierName,
                                            onChange: (e)=>setSupplierName(e.target.value),
                                            placeholder: "Northwind Trading"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 358,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 356,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Contact person name"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 362,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: contactPerson,
                                                    onChange: (e)=>setContactPerson(e.target.value),
                                                    placeholder: "John Doe"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 363,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 361,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Phone / WhatsApp"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: phone,
                                                    onChange: (e)=>setPhone(e.target.value),
                                                    placeholder: "+232 76 123 456"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 367,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 365,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 360,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Email address (optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 371,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: email,
                                            onChange: (e)=>setEmail(e.target.value),
                                            placeholder: "supplier@example.com"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 372,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 370,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Type of goods/services you supply"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 375,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: goodsType,
                                            onChange: (e)=>setGoodsType(e.target.value),
                                            placeholder: "Short description"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 376,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 374,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Product categories"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 379,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
                                            children: [
                                                'Food',
                                                'Beverages',
                                                'Cleaning',
                                                'IT',
                                                'Stationery',
                                                'Transport',
                                                'Building Materials'
                                            ].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2 text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                            lineNumber: 383,
                                                            columnNumber: 25
                                                        }, this),
                                                        cat
                                                    ]
                                                }, cat, true, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 380,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 378,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Areas you can supply / deliver to"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 396,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
                                            children: [
                                                'Western Urban',
                                                'Western Rural',
                                                'Provinces'
                                            ].map((area)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2 text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: supplyAreas.includes(area),
                                                            onChange: (e)=>{
                                                                setSupplyAreas((prev)=>e.target.checked ? [
                                                                        ...prev,
                                                                        area
                                                                    ] : prev.filter((a)=>a !== area));
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                            lineNumber: 400,
                                                            columnNumber: 25
                                                        }, this),
                                                        area
                                                    ]
                                                }, area, true, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 399,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 397,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 395,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Delivery timeline"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 413,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-3 text-xs",
                                            children: [
                                                'Same day',
                                                '24 hours',
                                                '2–3 days'
                                            ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            name: "delivery_timeline",
                                                            checked: deliveryTimeline === opt,
                                                            onChange: ()=>setDeliveryTimeline(opt)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                            lineNumber: 417,
                                                            columnNumber: 25
                                                        }, this),
                                                        opt
                                                    ]
                                                }, opt, true, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 416,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 414,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 412,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Price list upload"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 429,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "file",
                                            multiple: true,
                                            accept: "image/*,.pdf,.xls,.xlsx",
                                            onChange: (e)=>setPriceListFiles(e.target.files)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 430,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 428,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Business registration certificate (optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 433,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "file",
                                            multiple: true,
                                            accept: "image/*,.pdf",
                                            onChange: (e)=>setRegistrationFiles(e.target.files)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 434,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 432,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Bank details (optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 437,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: bankName,
                                                    onChange: (e)=>setBankName(e.target.value),
                                                    placeholder: "Bank name"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 439,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: accountName,
                                                    onChange: (e)=>setAccountName(e.target.value),
                                                    placeholder: "Account name"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 440,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: accountNumber,
                                                    onChange: (e)=>setAccountNumber(e.target.value),
                                                    placeholder: "Account number"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 441,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 438,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-xs mt-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: prefersCash,
                                                    onChange: (e)=>setPrefersCash(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 444,
                                                    columnNumber: 21
                                                }, this),
                                                "Vendor prefers cash"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 443,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 436,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Declaration & agreement"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 449,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: declInfoAccurate,
                                                    onChange: (e)=>setDeclInfoAccurate(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 451,
                                                    columnNumber: 21
                                                }, this),
                                                "I confirm the information provided is accurate."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 450,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: declAgreeRules,
                                                    onChange: (e)=>setDeclAgreeRules(e.target.checked)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 21
                                                }, this),
                                                "I agree to follow your procurement and delivery rules."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 454,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 448,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 pt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            onClick: ()=>setRole(null),
                                            className: "flex-1",
                                            children: "Back"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 460,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: submitSupplier,
                                            className: "flex-1",
                                            disabled: !supplierName || !declInfoAccurate || !declAgreeRules || loading !== null,
                                            children: loading === "supplier" ? "Submitting..." : "Submit"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 461,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 459,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                            lineNumber: 355,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                lineNumber: 152,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
            lineNumber: 151,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
_s(OnboardingContent, "O2RF7djn4OFbBniNYV0nkhdyDH8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = OnboardingContent;
var _c;
__turbopack_context__.k.register(_c, "OnboardingContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_842922c5._.js.map