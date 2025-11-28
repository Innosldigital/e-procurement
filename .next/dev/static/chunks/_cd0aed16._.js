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
"[project]/lib/actions/data:955208 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40f25c9448fb0c5a0c4bd6e6f0e64d26543287adad":"submitCompanyOnboarding"},"lib/actions/onboarding-actions.ts",""] */ __turbopack_context__.s([
    "submitCompanyOnboarding",
    ()=>submitCompanyOnboarding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var submitCompanyOnboarding = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40f25c9448fb0c5a0c4bd6e6f0e64d26543287adad", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "submitCompanyOnboarding"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vb25ib2FyZGluZy1hY3Rpb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc2VydmVyJ1xuXG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gJ25leHQvY2FjaGUnXG5pbXBvcnQgeyBhdXRoLCBjbGVya0NsaWVudCB9IGZyb20gJ0BjbGVyay9uZXh0anMvc2VydmVyJ1xuaW1wb3J0IGRiQ29ubmVjdCBmcm9tICdAL2xpYi9tb25nb2RiJ1xuaW1wb3J0IHsgU3VwcGxpZXIgfSBmcm9tICcuLi9tb2RlbHMvU3VwcGxpZXInXG5pbXBvcnQgeyBDb21wYW55IH0gZnJvbSAnLi4vbW9kZWxzL0NvbXBhbnknXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdWJtaXRDb21wYW55T25ib2FyZGluZyhkYXRhOiB7XG4gIGNvbXBhbnlOYW1lOiBzdHJpbmdcbiAgaW5kdXN0cnk/OiBzdHJpbmdcbiAgcmVnaW9uPzogc3RyaW5nXG4gIHNpemU/OiBzdHJpbmdcbiAgY29udGFjdEVtYWlsPzogc3RyaW5nXG59KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyB1c2VySWQgfSA9IGF3YWl0IGF1dGgoKVxuICAgIGlmICghdXNlcklkKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH1cbiAgICB9XG5cbiAgICBhd2FpdCBkYkNvbm5lY3QoKVxuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgQ29tcGFueS5jb3VudERvY3VtZW50cygpXG4gICAgY29uc3QgY29tcGFueUlkID0gYENPTVAtJHsoY291bnQgKyAxMDAwKS50b1N0cmluZygpfWBcblxuICAgIGF3YWl0IENvbXBhbnkuY3JlYXRlKHtcbiAgICAgIGNvbXBhbnlJZCxcbiAgICAgIG5hbWU6IGRhdGEuY29tcGFueU5hbWUsXG4gICAgICBhcHByb3ZlZDogZmFsc2UsXG4gICAgICBpbmR1c3RyeTogZGF0YS5pbmR1c3RyeSB8fCAnJyxcbiAgICAgIHJlZ2lvbjogZGF0YS5yZWdpb24gfHwgJycsXG4gICAgICBzaXplOiBkYXRhLnNpemUgfHwgJycsXG4gICAgICBjb250YWN0RW1haWw6IGRhdGEuY29udGFjdEVtYWlsIHx8ICcnLFxuICAgICAgb3duZXJVc2VySWQ6IHVzZXJJZCxcbiAgICB9KVxuXG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgY2xlcmtDbGllbnQoKVxuICAgIGF3YWl0IGNsaWVudC51c2Vycy51cGRhdGVVc2VyKHVzZXJJZCwge1xuICAgICAgcHVibGljTWV0YWRhdGE6IHtcbiAgICAgICAgcm9sZTogJ2NvbXBhbnknLFxuICAgICAgICBjb21wYW55SWQsXG4gICAgICAgIG9uYm9hcmRpbmdTdGF0dXM6ICdwZW5kaW5nX2FkbWluX2FwcHJvdmFsJyxcbiAgICAgICAgY29tcGFueToge1xuICAgICAgICAgIG5hbWU6IGRhdGEuY29tcGFueU5hbWUsXG4gICAgICAgICAgaW5kdXN0cnk6IGRhdGEuaW5kdXN0cnkgfHwgJycsXG4gICAgICAgICAgcmVnaW9uOiBkYXRhLnJlZ2lvbiB8fCAnJyxcbiAgICAgICAgICBzaXplOiBkYXRhLnNpemUgfHwgJycsXG4gICAgICAgICAgY29udGFjdEVtYWlsOiBkYXRhLmNvbnRhY3RFbWFpbCB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgb25ib2FyZGVkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIHJldmFsaWRhdGVQYXRoKCcvb25ib2FyZGluZycpXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogeyBjb21wYW55SWQgfSB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRmFpbGVkIHRvIHN1Ym1pdCBjb21wYW55IG9uYm9hcmRpbmcnIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3VibWl0U3VwcGxpZXJPbmJvYXJkaW5nKGRhdGE6IHtcbiAgbmFtZTogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb24/OiBzdHJpbmdcbiAgcGhvbmU/OiBzdHJpbmdcbiAgZW1haWw/OiBzdHJpbmdcbiAgZ29vZHNUeXBlPzogc3RyaW5nXG4gIHByb2R1Y3RDYXRlZ29yaWVzPzogc3RyaW5nW11cbiAgc3VwcGx5QXJlYXM/OiBzdHJpbmdbXVxuICBkZWxpdmVyeVRpbWVsaW5lPzogc3RyaW5nXG4gIHByaWNlTGlzdFVwbG9hZHM/OiB7IG5hbWU6IHN0cmluZzsgc2l6ZTogbnVtYmVyOyB0eXBlOiBzdHJpbmcgfVtdXG4gIHJlZ2lzdHJhdGlvbkNlcnRpZmljYXRlVXBsb2Fkcz86IHsgbmFtZTogc3RyaW5nOyBzaXplOiBudW1iZXI7IHR5cGU6IHN0cmluZyB9W11cbiAgYmFua0RldGFpbHM/OiB7IGJhbmtOYW1lPzogc3RyaW5nOyBhY2NvdW50TmFtZT86IHN0cmluZzsgYWNjb3VudE51bWJlcj86IHN0cmluZzsgcHJlZmVyc0Nhc2g/OiBib29sZWFuIH1cbiAgZGVjbGFyYXRpb25zPzogeyBpbmZvQWNjdXJhdGU/OiBib29sZWFuOyBhZ3JlZVJ1bGVzPzogYm9vbGVhbiB9XG4gIGNhdGVnb3J5Pzogc3RyaW5nXG4gIHJlZ2lvbj86IHN0cmluZ1xuICBzZWdtZW50Pzogc3RyaW5nXG59KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyB1c2VySWQgfSA9IGF3YWl0IGF1dGgoKVxuICAgIGlmICghdXNlcklkKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH1cbiAgICBhd2FpdCBkYkNvbm5lY3QoKVxuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgU3VwcGxpZXIuY291bnREb2N1bWVudHMoKVxuICAgIGNvbnN0IHN1cHBsaWVySWQgPSBgU1VQLSR7KGNvdW50ICsgNTAwMCkudG9TdHJpbmcoKX1gXG4gICAgY29uc3Qgc3VwcGxpZXIgPSBhd2FpdCBTdXBwbGllci5jcmVhdGUoe1xuICAgICAgc3VwcGxpZXJJZCxcbiAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgIGFwcHJvdmVkOiB0cnVlLFxuICAgICAgb3duZXJVc2VySWQ6IHVzZXJJZCxcbiAgICAgIGNhdGVnb3J5OiBkYXRhLmNhdGVnb3J5IHx8ICdHZW5lcmFsJyxcbiAgICAgIHJlZ2lvbjogZGF0YS5yZWdpb24gfHwgJ0dsb2JhbCcsXG4gICAgICBzZWdtZW50OiBkYXRhLnNlZ21lbnQgfHwgJ1N0YW5kYXJkJyxcbiAgICAgIG9uYm9hcmRpbmc6IHtcbiAgICAgICAgY29udGFjdFBlcnNvbjogZGF0YS5jb250YWN0UGVyc29uIHx8ICcnLFxuICAgICAgICBwaG9uZTogZGF0YS5waG9uZSB8fCAnJyxcbiAgICAgICAgZW1haWw6IGRhdGEuZW1haWwgfHwgJycsXG4gICAgICAgIGdvb2RzVHlwZTogZGF0YS5nb29kc1R5cGUgfHwgJycsXG4gICAgICAgIHByb2R1Y3RDYXRlZ29yaWVzOiBBcnJheS5pc0FycmF5KGRhdGEucHJvZHVjdENhdGVnb3JpZXMpID8gZGF0YS5wcm9kdWN0Q2F0ZWdvcmllcyA6IFtdLFxuICAgICAgICBzdXBwbHlBcmVhczogQXJyYXkuaXNBcnJheShkYXRhLnN1cHBseUFyZWFzKSA/IGRhdGEuc3VwcGx5QXJlYXMgOiBbXSxcbiAgICAgICAgZGVsaXZlcnlUaW1lbGluZTogZGF0YS5kZWxpdmVyeVRpbWVsaW5lIHx8ICcnLFxuICAgICAgICBwcmljZUxpc3RVcGxvYWRzOiBBcnJheS5pc0FycmF5KGRhdGEucHJpY2VMaXN0VXBsb2FkcykgPyBkYXRhLnByaWNlTGlzdFVwbG9hZHMgOiBbXSxcbiAgICAgICAgcmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVVcGxvYWRzOiBBcnJheS5pc0FycmF5KGRhdGEucmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVVcGxvYWRzKSA/IGRhdGEucmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVVcGxvYWRzIDogW10sXG4gICAgICAgIGJhbmtEZXRhaWxzOiB7XG4gICAgICAgICAgYmFua05hbWU6IGRhdGEuYmFua0RldGFpbHM/LmJhbmtOYW1lIHx8ICcnLFxuICAgICAgICAgIGFjY291bnROYW1lOiBkYXRhLmJhbmtEZXRhaWxzPy5hY2NvdW50TmFtZSB8fCAnJyxcbiAgICAgICAgICBhY2NvdW50TnVtYmVyOiBkYXRhLmJhbmtEZXRhaWxzPy5hY2NvdW50TnVtYmVyIHx8ICcnLFxuICAgICAgICAgIHByZWZlcnNDYXNoOiBCb29sZWFuKGRhdGEuYmFua0RldGFpbHM/LnByZWZlcnNDYXNoKSxcbiAgICAgICAgfSxcbiAgICAgICAgZGVjbGFyYXRpb25zOiB7XG4gICAgICAgICAgaW5mb0FjY3VyYXRlOiBCb29sZWFuKGRhdGEuZGVjbGFyYXRpb25zPy5pbmZvQWNjdXJhdGUpLFxuICAgICAgICAgIGFncmVlUnVsZXM6IEJvb2xlYW4oZGF0YS5kZWNsYXJhdGlvbnM/LmFncmVlUnVsZXMpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHBlcmZvcm1hbmNlU2NvcmU6IDAsXG4gICAgICByaXNrUmF0aW5nOiAnTG93JyxcbiAgICAgIHRvdGFsU3BlbmQ6IDAsXG4gICAgfSlcblxuICAgIGNvbnN0IGNsaWVudDIgPSBhd2FpdCBjbGVya0NsaWVudCgpXG4gICAgYXdhaXQgY2xpZW50Mi51c2Vycy51cGRhdGVVc2VyKHVzZXJJZCwge1xuICAgICAgcHVibGljTWV0YWRhdGE6IHtcbiAgICAgICAgcm9sZTogJ3N1cHBsaWVyJyxcbiAgICAgICAgc3VwcGxpZXJJZCxcbiAgICAgICAgb25ib2FyZGluZ1N0YXR1czogJ2FwcHJvdmVkJyxcbiAgICAgICAgb25ib2FyZGVkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9zdXBwbGllcnMnKVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc3VwcGxpZXIpKSB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRmFpbGVkIHRvIHN1Ym1pdCBzdXBwbGllciBvbmJvYXJkaW5nJyB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoia1RBUXNCIn0=
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/actions/data:415d36 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40b533b5a49f64416e62ca9e75858712f207a9ba1d":"submitSupplierOnboarding"},"lib/actions/onboarding-actions.ts",""] */ __turbopack_context__.s([
    "submitSupplierOnboarding",
    ()=>submitSupplierOnboarding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var submitSupplierOnboarding = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40b533b5a49f64416e62ca9e75858712f207a9ba1d", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "submitSupplierOnboarding"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vb25ib2FyZGluZy1hY3Rpb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc2VydmVyJ1xuXG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gJ25leHQvY2FjaGUnXG5pbXBvcnQgeyBhdXRoLCBjbGVya0NsaWVudCB9IGZyb20gJ0BjbGVyay9uZXh0anMvc2VydmVyJ1xuaW1wb3J0IGRiQ29ubmVjdCBmcm9tICdAL2xpYi9tb25nb2RiJ1xuaW1wb3J0IHsgU3VwcGxpZXIgfSBmcm9tICcuLi9tb2RlbHMvU3VwcGxpZXInXG5pbXBvcnQgeyBDb21wYW55IH0gZnJvbSAnLi4vbW9kZWxzL0NvbXBhbnknXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdWJtaXRDb21wYW55T25ib2FyZGluZyhkYXRhOiB7XG4gIGNvbXBhbnlOYW1lOiBzdHJpbmdcbiAgaW5kdXN0cnk/OiBzdHJpbmdcbiAgcmVnaW9uPzogc3RyaW5nXG4gIHNpemU/OiBzdHJpbmdcbiAgY29udGFjdEVtYWlsPzogc3RyaW5nXG59KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyB1c2VySWQgfSA9IGF3YWl0IGF1dGgoKVxuICAgIGlmICghdXNlcklkKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH1cbiAgICB9XG5cbiAgICBhd2FpdCBkYkNvbm5lY3QoKVxuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgQ29tcGFueS5jb3VudERvY3VtZW50cygpXG4gICAgY29uc3QgY29tcGFueUlkID0gYENPTVAtJHsoY291bnQgKyAxMDAwKS50b1N0cmluZygpfWBcblxuICAgIGF3YWl0IENvbXBhbnkuY3JlYXRlKHtcbiAgICAgIGNvbXBhbnlJZCxcbiAgICAgIG5hbWU6IGRhdGEuY29tcGFueU5hbWUsXG4gICAgICBhcHByb3ZlZDogZmFsc2UsXG4gICAgICBpbmR1c3RyeTogZGF0YS5pbmR1c3RyeSB8fCAnJyxcbiAgICAgIHJlZ2lvbjogZGF0YS5yZWdpb24gfHwgJycsXG4gICAgICBzaXplOiBkYXRhLnNpemUgfHwgJycsXG4gICAgICBjb250YWN0RW1haWw6IGRhdGEuY29udGFjdEVtYWlsIHx8ICcnLFxuICAgICAgb3duZXJVc2VySWQ6IHVzZXJJZCxcbiAgICB9KVxuXG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgY2xlcmtDbGllbnQoKVxuICAgIGF3YWl0IGNsaWVudC51c2Vycy51cGRhdGVVc2VyKHVzZXJJZCwge1xuICAgICAgcHVibGljTWV0YWRhdGE6IHtcbiAgICAgICAgcm9sZTogJ2NvbXBhbnknLFxuICAgICAgICBjb21wYW55SWQsXG4gICAgICAgIG9uYm9hcmRpbmdTdGF0dXM6ICdwZW5kaW5nX2FkbWluX2FwcHJvdmFsJyxcbiAgICAgICAgY29tcGFueToge1xuICAgICAgICAgIG5hbWU6IGRhdGEuY29tcGFueU5hbWUsXG4gICAgICAgICAgaW5kdXN0cnk6IGRhdGEuaW5kdXN0cnkgfHwgJycsXG4gICAgICAgICAgcmVnaW9uOiBkYXRhLnJlZ2lvbiB8fCAnJyxcbiAgICAgICAgICBzaXplOiBkYXRhLnNpemUgfHwgJycsXG4gICAgICAgICAgY29udGFjdEVtYWlsOiBkYXRhLmNvbnRhY3RFbWFpbCB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgb25ib2FyZGVkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIHJldmFsaWRhdGVQYXRoKCcvb25ib2FyZGluZycpXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogeyBjb21wYW55SWQgfSB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRmFpbGVkIHRvIHN1Ym1pdCBjb21wYW55IG9uYm9hcmRpbmcnIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3VibWl0U3VwcGxpZXJPbmJvYXJkaW5nKGRhdGE6IHtcbiAgbmFtZTogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb24/OiBzdHJpbmdcbiAgcGhvbmU/OiBzdHJpbmdcbiAgZW1haWw/OiBzdHJpbmdcbiAgZ29vZHNUeXBlPzogc3RyaW5nXG4gIHByb2R1Y3RDYXRlZ29yaWVzPzogc3RyaW5nW11cbiAgc3VwcGx5QXJlYXM/OiBzdHJpbmdbXVxuICBkZWxpdmVyeVRpbWVsaW5lPzogc3RyaW5nXG4gIHByaWNlTGlzdFVwbG9hZHM/OiB7IG5hbWU6IHN0cmluZzsgc2l6ZTogbnVtYmVyOyB0eXBlOiBzdHJpbmcgfVtdXG4gIHJlZ2lzdHJhdGlvbkNlcnRpZmljYXRlVXBsb2Fkcz86IHsgbmFtZTogc3RyaW5nOyBzaXplOiBudW1iZXI7IHR5cGU6IHN0cmluZyB9W11cbiAgYmFua0RldGFpbHM/OiB7IGJhbmtOYW1lPzogc3RyaW5nOyBhY2NvdW50TmFtZT86IHN0cmluZzsgYWNjb3VudE51bWJlcj86IHN0cmluZzsgcHJlZmVyc0Nhc2g/OiBib29sZWFuIH1cbiAgZGVjbGFyYXRpb25zPzogeyBpbmZvQWNjdXJhdGU/OiBib29sZWFuOyBhZ3JlZVJ1bGVzPzogYm9vbGVhbiB9XG4gIGNhdGVnb3J5Pzogc3RyaW5nXG4gIHJlZ2lvbj86IHN0cmluZ1xuICBzZWdtZW50Pzogc3RyaW5nXG59KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyB1c2VySWQgfSA9IGF3YWl0IGF1dGgoKVxuICAgIGlmICghdXNlcklkKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH1cbiAgICBhd2FpdCBkYkNvbm5lY3QoKVxuICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgU3VwcGxpZXIuY291bnREb2N1bWVudHMoKVxuICAgIGNvbnN0IHN1cHBsaWVySWQgPSBgU1VQLSR7KGNvdW50ICsgNTAwMCkudG9TdHJpbmcoKX1gXG4gICAgY29uc3Qgc3VwcGxpZXIgPSBhd2FpdCBTdXBwbGllci5jcmVhdGUoe1xuICAgICAgc3VwcGxpZXJJZCxcbiAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgIGFwcHJvdmVkOiB0cnVlLFxuICAgICAgb3duZXJVc2VySWQ6IHVzZXJJZCxcbiAgICAgIGNhdGVnb3J5OiBkYXRhLmNhdGVnb3J5IHx8ICdHZW5lcmFsJyxcbiAgICAgIHJlZ2lvbjogZGF0YS5yZWdpb24gfHwgJ0dsb2JhbCcsXG4gICAgICBzZWdtZW50OiBkYXRhLnNlZ21lbnQgfHwgJ1N0YW5kYXJkJyxcbiAgICAgIG9uYm9hcmRpbmc6IHtcbiAgICAgICAgY29udGFjdFBlcnNvbjogZGF0YS5jb250YWN0UGVyc29uIHx8ICcnLFxuICAgICAgICBwaG9uZTogZGF0YS5waG9uZSB8fCAnJyxcbiAgICAgICAgZW1haWw6IGRhdGEuZW1haWwgfHwgJycsXG4gICAgICAgIGdvb2RzVHlwZTogZGF0YS5nb29kc1R5cGUgfHwgJycsXG4gICAgICAgIHByb2R1Y3RDYXRlZ29yaWVzOiBBcnJheS5pc0FycmF5KGRhdGEucHJvZHVjdENhdGVnb3JpZXMpID8gZGF0YS5wcm9kdWN0Q2F0ZWdvcmllcyA6IFtdLFxuICAgICAgICBzdXBwbHlBcmVhczogQXJyYXkuaXNBcnJheShkYXRhLnN1cHBseUFyZWFzKSA/IGRhdGEuc3VwcGx5QXJlYXMgOiBbXSxcbiAgICAgICAgZGVsaXZlcnlUaW1lbGluZTogZGF0YS5kZWxpdmVyeVRpbWVsaW5lIHx8ICcnLFxuICAgICAgICBwcmljZUxpc3RVcGxvYWRzOiBBcnJheS5pc0FycmF5KGRhdGEucHJpY2VMaXN0VXBsb2FkcykgPyBkYXRhLnByaWNlTGlzdFVwbG9hZHMgOiBbXSxcbiAgICAgICAgcmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVVcGxvYWRzOiBBcnJheS5pc0FycmF5KGRhdGEucmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVVcGxvYWRzKSA/IGRhdGEucmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVVcGxvYWRzIDogW10sXG4gICAgICAgIGJhbmtEZXRhaWxzOiB7XG4gICAgICAgICAgYmFua05hbWU6IGRhdGEuYmFua0RldGFpbHM/LmJhbmtOYW1lIHx8ICcnLFxuICAgICAgICAgIGFjY291bnROYW1lOiBkYXRhLmJhbmtEZXRhaWxzPy5hY2NvdW50TmFtZSB8fCAnJyxcbiAgICAgICAgICBhY2NvdW50TnVtYmVyOiBkYXRhLmJhbmtEZXRhaWxzPy5hY2NvdW50TnVtYmVyIHx8ICcnLFxuICAgICAgICAgIHByZWZlcnNDYXNoOiBCb29sZWFuKGRhdGEuYmFua0RldGFpbHM/LnByZWZlcnNDYXNoKSxcbiAgICAgICAgfSxcbiAgICAgICAgZGVjbGFyYXRpb25zOiB7XG4gICAgICAgICAgaW5mb0FjY3VyYXRlOiBCb29sZWFuKGRhdGEuZGVjbGFyYXRpb25zPy5pbmZvQWNjdXJhdGUpLFxuICAgICAgICAgIGFncmVlUnVsZXM6IEJvb2xlYW4oZGF0YS5kZWNsYXJhdGlvbnM/LmFncmVlUnVsZXMpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHBlcmZvcm1hbmNlU2NvcmU6IDAsXG4gICAgICByaXNrUmF0aW5nOiAnTG93JyxcbiAgICAgIHRvdGFsU3BlbmQ6IDAsXG4gICAgfSlcblxuICAgIGNvbnN0IGNsaWVudDIgPSBhd2FpdCBjbGVya0NsaWVudCgpXG4gICAgYXdhaXQgY2xpZW50Mi51c2Vycy51cGRhdGVVc2VyKHVzZXJJZCwge1xuICAgICAgcHVibGljTWV0YWRhdGE6IHtcbiAgICAgICAgcm9sZTogJ3N1cHBsaWVyJyxcbiAgICAgICAgc3VwcGxpZXJJZCxcbiAgICAgICAgb25ib2FyZGluZ1N0YXR1czogJ2FwcHJvdmVkJyxcbiAgICAgICAgb25ib2FyZGVkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9zdXBwbGllcnMnKVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc3VwcGxpZXIpKSB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRmFpbGVkIHRvIHN1Ym1pdCBzdXBwbGllciBvbmJvYXJkaW5nJyB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoibVRBNERzQiJ9
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$955208__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/lib/actions/data:955208 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$415d36__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/lib/actions/data:415d36 [app-client] (ecmascript) <text/javascript>");
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
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$955208__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["submitCompanyOnboarding"])({
            companyName,
            industry,
            region,
            size,
            contactEmail
        });
        setLoading(null);
        if (res && res.success) router.push("/suppliers");
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
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$415d36__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["submitSupplierOnboarding"])({
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
        if (res && res.success) router.push("/onboarding?pending=1");
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
                                            lineNumber: 82,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                            className: "text-xs",
                                            children: "Select your role and complete onboarding."
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 83,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                    status: role ? role : "Select role"
                                }, void 0, false, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                        lineNumber: 79,
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
                                    lineNumber: 91,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>setRole("supplier"),
                                    children: "I am a supplier"
                                }, void 0, false, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 92,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                            lineNumber: 90,
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
                                            lineNumber: 97,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: companyName,
                                            onChange: (e)=>setCompanyName(e.target.value),
                                            placeholder: "Acme Corp"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 98,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 96,
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
                                                    lineNumber: 102,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: industry,
                                                    onChange: (e)=>setIndustry(e.target.value),
                                                    placeholder: "Manufacturing"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 101,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Region"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: region,
                                                    onChange: (e)=>setRegion(e.target.value),
                                                    placeholder: "Global HQ"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 105,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 100,
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
                                                    lineNumber: 112,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: size,
                                                    onChange: (e)=>setSize(e.target.value),
                                                    placeholder: "500+"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 111,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Contact email"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: contactEmail,
                                                    onChange: (e)=>setContactEmail(e.target.value),
                                                    placeholder: "admin@company.com"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 115,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 110,
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
                                            lineNumber: 121,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: submitCompany,
                                            className: "flex-1",
                                            disabled: !companyName || loading !== null,
                                            children: loading === "company" ? "Submitting..." : "Submit"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 122,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 120,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                            lineNumber: 95,
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
                                            lineNumber: 128,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: supplierName,
                                            onChange: (e)=>setSupplierName(e.target.value),
                                            placeholder: "Northwind Trading"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 129,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 127,
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
                                                    lineNumber: 133,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: contactPerson,
                                                    onChange: (e)=>setContactPerson(e.target.value),
                                                    placeholder: "John Doe"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 132,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Phone / WhatsApp"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: phone,
                                                    onChange: (e)=>setPhone(e.target.value),
                                                    placeholder: "+232 76 123 456"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 136,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 131,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Email address (optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 142,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: email,
                                            onChange: (e)=>setEmail(e.target.value),
                                            placeholder: "supplier@example.com"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 143,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 141,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Type of goods/services you supply"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 146,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: goodsType,
                                            onChange: (e)=>setGoodsType(e.target.value),
                                            placeholder: "Short description"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 147,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 145,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Product categories"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 150,
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
                                                            lineNumber: 154,
                                                            columnNumber: 25
                                                        }, this),
                                                        cat
                                                    ]
                                                }, cat, true, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 153,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 151,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 149,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Areas you can supply / deliver to"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 167,
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
                                                            lineNumber: 171,
                                                            columnNumber: 25
                                                        }, this),
                                                        area
                                                    ]
                                                }, area, true, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 168,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 166,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Delivery timeline"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 184,
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
                                                            lineNumber: 188,
                                                            columnNumber: 25
                                                        }, this),
                                                        opt
                                                    ]
                                                }, opt, true, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 185,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 183,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Price list upload"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 200,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "file",
                                            multiple: true,
                                            accept: "image/*,.pdf,.xls,.xlsx",
                                            onChange: (e)=>setPriceListFiles(e.target.files)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 201,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 199,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Business registration certificate (optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 204,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "file",
                                            multiple: true,
                                            accept: "image/*,.pdf",
                                            onChange: (e)=>setRegistrationFiles(e.target.files)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 205,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 203,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Bank details (optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 208,
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
                                                    lineNumber: 210,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: accountName,
                                                    onChange: (e)=>setAccountName(e.target.value),
                                                    placeholder: "Account name"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    value: accountNumber,
                                                    onChange: (e)=>setAccountNumber(e.target.value),
                                                    placeholder: "Account number"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 209,
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
                                                    lineNumber: 215,
                                                    columnNumber: 21
                                                }, this),
                                                "Vendor prefers cash"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 214,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 207,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            children: "Declaration & agreement"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 220,
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
                                                    lineNumber: 222,
                                                    columnNumber: 21
                                                }, this),
                                                "I confirm the information provided is accurate."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 221,
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
                                                    lineNumber: 226,
                                                    columnNumber: 21
                                                }, this),
                                                "I agree to follow your procurement and delivery rules."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 225,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 219,
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
                                            lineNumber: 231,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: submitSupplier,
                                            className: "flex-1",
                                            disabled: !supplierName || !declInfoAccurate || !declAgreeRules || loading !== null,
                                            children: loading === "supplier" ? "Submitting..." : "Submit"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 232,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 230,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                            lineNumber: 126,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
            lineNumber: 77,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_s(OnboardingContent, "louXq2826wptMRQwZH1e4WYB3JE=", false, function() {
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

//# sourceMappingURL=_cd0aed16._.js.map