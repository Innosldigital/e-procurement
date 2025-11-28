module.exports = [
"[project]/components/ui/textarea.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Textarea({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        "data-slot": "textarea",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/textarea.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/components/ui/select.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-select/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Select({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "select",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
function SelectGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "select-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
function SelectValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Value"], {
        "data-slot": "select-value",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
function SelectTrigger({ className, size = 'default', children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "size-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
function SelectContent({ className, children, position = 'popper', ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "select-content",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md', position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', className),
            position: position,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('p-1', position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/select.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "select-label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground px-2 py-1.5 text-xs', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "select-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute right-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/select.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "select-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-border pointer-events-none -mx-1 my-1 h-px', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        "data-slot": "select-scroll-up-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex cursor-default items-center justify-center py-1', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/components/ui/select.tsx",
            lineNumber: 151,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        "data-slot": "select-scroll-down-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex cursor-default items-center justify-center py-1', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/components/ui/select.tsx",
            lineNumber: 169,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/components/ui/radio-group.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RadioGroup",
    ()=>RadioGroup,
    "RadioGroupItem",
    ()=>RadioGroupItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-radio-group/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-ssr] (ecmascript) <export default as CircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function RadioGroup({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "radio-group",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('grid gap-3', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/radio-group.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
function RadioGroupItem({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "radio-group-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Indicator"], {
            "data-slot": "radio-group-indicator",
            className: "relative flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__["CircleIcon"], {
                className: "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2"
            }, void 0, false, {
                fileName: "[project]/components/ui/radio-group.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ui/radio-group.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/radio-group.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/components/ui/checkbox.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>Checkbox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-checkbox/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Checkbox({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "checkbox",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Indicator"], {
            "data-slot": "checkbox-indicator",
            className: "flex items-center justify-center text-current transition-none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                className: "size-3.5"
            }, void 0, false, {
                fileName: "[project]/components/ui/checkbox.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ui/checkbox.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/checkbox.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
;
}),
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
"[project]/lib/actions/data:38813f [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40f25c9448fb0c5a0c4bd6e6f0e64d26543287adad":"submitCompanyOnboarding"},"lib/actions/onboarding-actions.ts",""] */ __turbopack_context__.s([
    "submitCompanyOnboarding",
    ()=>submitCompanyOnboarding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var submitCompanyOnboarding = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("40f25c9448fb0c5a0c4bd6e6f0e64d26543287adad", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "submitCompanyOnboarding"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vb25ib2FyZGluZy1hY3Rpb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc2VydmVyJ1xuXG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gJ25leHQvY2FjaGUnXG5pbXBvcnQgeyBhdXRoLCBjbGVya0NsaWVudCB9IGZyb20gJ0BjbGVyay9uZXh0anMvc2VydmVyJ1xuaW1wb3J0IGRiQ29ubmVjdCBmcm9tICdAL2xpYi9tb25nb2RiJ1xuaW1wb3J0IHsgU3VwcGxpZXIgfSBmcm9tICcuLi9tb2RlbHMvU3VwcGxpZXInXG5pbXBvcnQgeyBDb21wYW55IH0gZnJvbSAnLi4vbW9kZWxzL0NvbXBhbnknXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdWJtaXRDb21wYW55T25ib2FyZGluZyhkYXRhOiB7XG4gIGNvbXBhbnlOYW1lOiBzdHJpbmdcbiAgaW5kdXN0cnk/OiBzdHJpbmdcbiAgcmVnaW9uPzogc3RyaW5nXG4gIHNpemU/OiBzdHJpbmdcbiAgY29udGFjdEVtYWlsPzogc3RyaW5nXG4gIG9yZ2FuaXphdGlvblR5cGU/OiBzdHJpbmdcbiAgYWRkcmVzcz86IHN0cmluZ1xuICBvZmZpY2lhbEVtYWlsPzogc3RyaW5nXG4gIGNvbXBhbnlQaG9uZT86IHN0cmluZ1xuICB3ZWJzaXRlPzogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb25OYW1lPzogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb25Sb2xlPzogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb25QaG9uZT86IHN0cmluZ1xuICBjb250YWN0UGVyc29uRW1haWw/OiBzdHJpbmdcbiAgYnVzaW5lc3NEZXNjcmlwdGlvbj86IHN0cmluZ1xuICBoYXNCcmFuY2hlcz86IGJvb2xlYW5cbiAgbnVtYmVyT2ZCcmFuY2hlcz86IG51bWJlclxuICBicmFuY2hMb2NhdGlvbnM/OiBzdHJpbmdcbiAgY2VudHJhbFN0b3JlPzogc3RyaW5nXG4gIHByb2N1cmVtZW50TWV0aG9kPzogc3RyaW5nXG4gIHJlcXVpcmVzQXBwcm92YWxXb3JrZmxvd3M/OiBib29sZWFuXG4gIGFwcHJvdmFsTGV2ZWxzPzogc3RyaW5nW11cbiAgbWFuYWdlck5hbWU/OiBzdHJpbmdcbiAgbWFuYWdlclBvc2l0aW9uPzogc3RyaW5nXG4gIG1hbmFnZXJFbWFpbD86IHN0cmluZ1xuICBlbXBsb3llZUFjY2Vzc0NvdW50Pzogc3RyaW5nXG4gIGRlcGFydG1lbnRzPzogc3RyaW5nW11cbiAgb3RoZXJEZXBhcnRtZW50Pzogc3RyaW5nXG4gIHJlZ2lzdHJhdGlvblVwbG9hZHM/OiB7IG5hbWU6IHN0cmluZzsgc2l6ZTogbnVtYmVyOyB0eXBlOiBzdHJpbmcgfVtdXG4gIHRpbj86IHN0cmluZ1xuICBsb2dvVXBsb2Fkcz86IHsgbmFtZTogc3RyaW5nOyBzaXplOiBudW1iZXI7IHR5cGU6IHN0cmluZyB9W11cbiAgdmVuZG9yc1NlbGZPbmJvYXJkPzogc3RyaW5nXG4gIHRlbmRlcmluZ0VuYWJsZWQ/OiBib29sZWFuXG4gIGVJbnZvaWNpbmdFbmFibGVkPzogYm9vbGVhblxuICBhbmFseXRpY3NFbmFibGVkPzogYm9vbGVhblxuICBzeXN0ZW1NYW5hZ2VyTmFtZT86IHN0cmluZ1xuICBzeXN0ZW1NYW5hZ2VyUm9sZT86IHN0cmluZ1xuICBpbnZvaWNlc0FwcHJvdmVyPzogc3RyaW5nXG4gIHBvQXBwcm92ZXI/OiBzdHJpbmdcbiAgZ29vZHNSZWNlaXZlcj86IHN0cmluZ1xuICBwcm9qZWN0TGVhZD86IHN0cmluZ1xuICB0cmFpbmluZ09mZmljZXI/OiBzdHJpbmdcbiAgZGVjbGFyYXRpb25JbmZvQWNjdXJhdGU/OiBib29sZWFuXG4gIGRlY2xhcmF0aW9uQWdyZWVPbmJvYXJkaW5nPzogYm9vbGVhblxufSkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdXNlcklkIH0gPSBhd2FpdCBhdXRoKClcbiAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVW5hdXRob3JpemVkJyB9XG4gICAgfVxuXG4gICAgYXdhaXQgZGJDb25uZWN0KClcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IENvbXBhbnkuY291bnREb2N1bWVudHMoKVxuICAgIGNvbnN0IGNvbXBhbnlJZCA9IGBDT01QLSR7KGNvdW50ICsgMTAwMCkudG9TdHJpbmcoKX1gXG5cbiAgICBhd2FpdCBDb21wYW55LmNyZWF0ZSh7XG4gICAgICBjb21wYW55SWQsXG4gICAgICBuYW1lOiBkYXRhLmNvbXBhbnlOYW1lLFxuICAgICAgYXBwcm92ZWQ6IGZhbHNlLFxuICAgICAgaW5kdXN0cnk6IGRhdGEuaW5kdXN0cnkgfHwgJycsXG4gICAgICByZWdpb246IGRhdGEucmVnaW9uIHx8ICcnLFxuICAgICAgc2l6ZTogZGF0YS5zaXplIHx8ICcnLFxuICAgICAgY29udGFjdEVtYWlsOiBkYXRhLmNvbnRhY3RFbWFpbCB8fCAnJyxcbiAgICAgIG93bmVyVXNlcklkOiB1c2VySWQsXG4gICAgICBvbmJvYXJkaW5nOiB7XG4gICAgICAgIGNvbXBhbnlJbmZvcm1hdGlvbjoge1xuICAgICAgICAgIG9yZ2FuaXphdGlvblR5cGU6IGRhdGEub3JnYW5pemF0aW9uVHlwZSB8fCAnJyxcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MgfHwgJycsXG4gICAgICAgICAgb2ZmaWNpYWxFbWFpbDogZGF0YS5vZmZpY2lhbEVtYWlsIHx8ICcnLFxuICAgICAgICAgIHBob25lOiBkYXRhLmNvbXBhbnlQaG9uZSB8fCAnJyxcbiAgICAgICAgICB3ZWJzaXRlOiBkYXRhLndlYnNpdGUgfHwgJycsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRhY3RQZXJzb246IHtcbiAgICAgICAgICBuYW1lOiBkYXRhLmNvbnRhY3RQZXJzb25OYW1lIHx8ICcnLFxuICAgICAgICAgIHJvbGU6IGRhdGEuY29udGFjdFBlcnNvblJvbGUgfHwgJycsXG4gICAgICAgICAgcGhvbmU6IGRhdGEuY29udGFjdFBlcnNvblBob25lIHx8ICcnLFxuICAgICAgICAgIGVtYWlsOiBkYXRhLmNvbnRhY3RQZXJzb25FbWFpbCB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgYnVzaW5lc3NPcGVyYXRpb25zOiB7XG4gICAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuYnVzaW5lc3NEZXNjcmlwdGlvbiB8fCAnJyxcbiAgICAgICAgICBoYXNCcmFuY2hlczogQm9vbGVhbihkYXRhLmhhc0JyYW5jaGVzKSxcbiAgICAgICAgICBudW1iZXJPZkJyYW5jaGVzOiB0eXBlb2YgZGF0YS5udW1iZXJPZkJyYW5jaGVzID09PSAnbnVtYmVyJyA/IGRhdGEubnVtYmVyT2ZCcmFuY2hlcyA6IDAsXG4gICAgICAgICAgYnJhbmNoTG9jYXRpb25zOiBkYXRhLmJyYW5jaExvY2F0aW9ucyB8fCAnJyxcbiAgICAgICAgICBjZW50cmFsU3RvcmU6IGRhdGEuY2VudHJhbFN0b3JlIHx8ICcnLFxuICAgICAgICB9LFxuICAgICAgICBwcm9jdXJlbWVudFN0cnVjdHVyZToge1xuICAgICAgICAgIGN1cnJlbnRNZXRob2Q6IGRhdGEucHJvY3VyZW1lbnRNZXRob2QgfHwgJycsXG4gICAgICAgICAgcmVxdWlyZXNBcHByb3ZhbFdvcmtmbG93czogQm9vbGVhbihkYXRhLnJlcXVpcmVzQXBwcm92YWxXb3JrZmxvd3MpLFxuICAgICAgICAgIGFwcHJvdmFsTGV2ZWxzOiBBcnJheS5pc0FycmF5KGRhdGEuYXBwcm92YWxMZXZlbHMpID8gZGF0YS5hcHByb3ZhbExldmVscyA6IFtdLFxuICAgICAgICAgIG1hbmFnZXI6IHtcbiAgICAgICAgICAgIG5hbWU6IGRhdGEubWFuYWdlck5hbWUgfHwgJycsXG4gICAgICAgICAgICBwb3NpdGlvbjogZGF0YS5tYW5hZ2VyUG9zaXRpb24gfHwgJycsXG4gICAgICAgICAgICBlbWFpbDogZGF0YS5tYW5hZ2VyRW1haWwgfHwgJycsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgdXNlclNldHVwOiB7XG4gICAgICAgICAgZW1wbG95ZWVBY2Nlc3NDb3VudDogZGF0YS5lbXBsb3llZUFjY2Vzc0NvdW50IHx8ICcnLFxuICAgICAgICAgIGRlcGFydG1lbnRzOiBBcnJheS5pc0FycmF5KGRhdGEuZGVwYXJ0bWVudHMpID8gZGF0YS5kZXBhcnRtZW50cyA6IFtdLFxuICAgICAgICAgIG90aGVyRGVwYXJ0bWVudDogZGF0YS5vdGhlckRlcGFydG1lbnQgfHwgJycsXG4gICAgICAgIH0sXG4gICAgICAgIGRvY3VtZW50czoge1xuICAgICAgICAgIHJlZ2lzdHJhdGlvblVwbG9hZHM6IEFycmF5LmlzQXJyYXkoZGF0YS5yZWdpc3RyYXRpb25VcGxvYWRzKSA/IGRhdGEucmVnaXN0cmF0aW9uVXBsb2FkcyA6IFtdLFxuICAgICAgICAgIHRpbjogZGF0YS50aW4gfHwgJycsXG4gICAgICAgICAgbG9nb1VwbG9hZHM6IEFycmF5LmlzQXJyYXkoZGF0YS5sb2dvVXBsb2FkcykgPyBkYXRhLmxvZ29VcGxvYWRzIDogW10sXG4gICAgICAgIH0sXG4gICAgICAgIHN5c3RlbUNvbmZpZ3VyYXRpb246IHtcbiAgICAgICAgICB2ZW5kb3JzU2VsZk9uYm9hcmQ6IGRhdGEudmVuZG9yc1NlbGZPbmJvYXJkIHx8ICcnLFxuICAgICAgICAgIHRlbmRlcmluZ0VuYWJsZWQ6IEJvb2xlYW4oZGF0YS50ZW5kZXJpbmdFbmFibGVkKSxcbiAgICAgICAgICBlSW52b2ljaW5nRW5hYmxlZDogQm9vbGVhbihkYXRhLmVJbnZvaWNpbmdFbmFibGVkKSxcbiAgICAgICAgICBhbmFseXRpY3NFbmFibGVkOiBCb29sZWFuKGRhdGEuYW5hbHl0aWNzRW5hYmxlZCksXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3BvbnNpYmlsaXRpZXM6IHtcbiAgICAgICAgICBzeXN0ZW1NYW5hZ2VyTmFtZTogZGF0YS5zeXN0ZW1NYW5hZ2VyTmFtZSB8fCAnJyxcbiAgICAgICAgICBzeXN0ZW1NYW5hZ2VyUm9sZTogZGF0YS5zeXN0ZW1NYW5hZ2VyUm9sZSB8fCAnJyxcbiAgICAgICAgICBpbnZvaWNlc0FwcHJvdmVyOiBkYXRhLmludm9pY2VzQXBwcm92ZXIgfHwgJycsXG4gICAgICAgICAgcG9BcHByb3ZlcjogZGF0YS5wb0FwcHJvdmVyIHx8ICcnLFxuICAgICAgICAgIGdvb2RzUmVjZWl2ZXI6IGRhdGEuZ29vZHNSZWNlaXZlciB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgdGVhbU1lbWJlcnM6IHtcbiAgICAgICAgICBwcm9qZWN0TGVhZDogZGF0YS5wcm9qZWN0TGVhZCB8fCAnJyxcbiAgICAgICAgICB0cmFpbmluZ09mZmljZXI6IGRhdGEudHJhaW5pbmdPZmZpY2VyIHx8ICcnLFxuICAgICAgICB9LFxuICAgICAgICBkZWNsYXJhdGlvbnM6IHtcbiAgICAgICAgICBpbmZvQWNjdXJhdGU6IEJvb2xlYW4oZGF0YS5kZWNsYXJhdGlvbkluZm9BY2N1cmF0ZSksXG4gICAgICAgICAgYWdyZWVPbmJvYXJkaW5nOiBCb29sZWFuKGRhdGEuZGVjbGFyYXRpb25BZ3JlZU9uYm9hcmRpbmcpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgY2xlcmtDbGllbnQoKVxuICAgIGF3YWl0IGNsaWVudC51c2Vycy51cGRhdGVVc2VyKHVzZXJJZCwge1xuICAgICAgcHVibGljTWV0YWRhdGE6IHtcbiAgICAgICAgcm9sZTogJ2NvbXBhbnknLFxuICAgICAgICBjb21wYW55SWQsXG4gICAgICAgIG9uYm9hcmRpbmdTdGF0dXM6ICdwZW5kaW5nX2FkbWluX2FwcHJvdmFsJyxcbiAgICAgICAgY29tcGFueToge1xuICAgICAgICAgIG5hbWU6IGRhdGEuY29tcGFueU5hbWUsXG4gICAgICAgICAgaW5kdXN0cnk6IGRhdGEuaW5kdXN0cnkgfHwgJycsXG4gICAgICAgICAgcmVnaW9uOiBkYXRhLnJlZ2lvbiB8fCAnJyxcbiAgICAgICAgICBzaXplOiBkYXRhLnNpemUgfHwgJycsXG4gICAgICAgICAgY29udGFjdEVtYWlsOiBkYXRhLmNvbnRhY3RFbWFpbCB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgb25ib2FyZGVkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIHJldmFsaWRhdGVQYXRoKCcvb25ib2FyZGluZycpXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogeyBjb21wYW55SWQgfSB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRmFpbGVkIHRvIHN1Ym1pdCBjb21wYW55IG9uYm9hcmRpbmcnIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3VibWl0U3VwcGxpZXJPbmJvYXJkaW5nKGRhdGE6IHtcbiAgbmFtZTogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb24/OiBzdHJpbmdcbiAgcGhvbmU/OiBzdHJpbmdcbiAgZW1haWw/OiBzdHJpbmdcbiAgZ29vZHNUeXBlPzogc3RyaW5nXG4gIHByb2R1Y3RDYXRlZ29yaWVzPzogc3RyaW5nW11cbiAgc3VwcGx5QXJlYXM/OiBzdHJpbmdbXVxuICBkZWxpdmVyeVRpbWVsaW5lPzogc3RyaW5nXG4gIHByaWNlTGlzdFVwbG9hZHM/OiB7IG5hbWU6IHN0cmluZzsgc2l6ZTogbnVtYmVyOyB0eXBlOiBzdHJpbmcgfVtdXG4gIHJlZ2lzdHJhdGlvbkNlcnRpZmljYXRlVXBsb2Fkcz86IHsgbmFtZTogc3RyaW5nOyBzaXplOiBudW1iZXI7IHR5cGU6IHN0cmluZyB9W11cbiAgYnVzaW5lc3NSZWdpc3RyYXRpb25DZXJ0aWZpY2F0ZVVwbG9hZHM/OiB7IG5hbWU6IHN0cmluZzsgc2l6ZTogbnVtYmVyOyB0eXBlOiBzdHJpbmcgfVtdXG4gIHRheENsZWFyYW5jZUNlcnRpZmljYXRlVXBsb2Fkcz86IHsgbmFtZTogc3RyaW5nOyBzaXplOiBudW1iZXI7IHR5cGU6IHN0cmluZyB9W11cbiAgZ3N0VmF0UmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVVcGxvYWRzPzogeyBuYW1lOiBzdHJpbmc7IHNpemU6IG51bWJlcjsgdHlwZTogc3RyaW5nIH1bXVxuICBidXNpbmVzc0xpY2Vuc2VVcGxvYWRzPzogeyBuYW1lOiBzdHJpbmc7IHNpemU6IG51bWJlcjsgdHlwZTogc3RyaW5nIH1bXVxuICBuYXNzaXRDZXJ0aWZpY2F0ZVVwbG9hZHM/OiB7IG5hbWU6IHN0cmluZzsgc2l6ZTogbnVtYmVyOyB0eXBlOiBzdHJpbmcgfVtdXG4gIHNlY3RvclNwZWNpZmljQ2VydGlmaWNhdGVVcGxvYWRzPzogeyBuYW1lOiBzdHJpbmc7IHNpemU6IG51bWJlcjsgdHlwZTogc3RyaW5nIH1bXVxuICBwYXltZW50TWV0aG9kcz86IHN0cmluZ1tdXG4gIGJhbmtEZXRhaWxzPzogeyBiYW5rTmFtZT86IHN0cmluZzsgYWNjb3VudE5hbWU/OiBzdHJpbmc7IGFjY291bnROdW1iZXI/OiBzdHJpbmc7IHByZWZlcnNDYXNoPzogYm9vbGVhbiB9XG4gIGRlY2xhcmF0aW9ucz86IHsgaW5mb0FjY3VyYXRlPzogYm9vbGVhbjsgYWdyZWVSdWxlcz86IGJvb2xlYW4gfVxuICBjYXRlZ29yeT86IHN0cmluZ1xuICByZWdpb24/OiBzdHJpbmdcbiAgc2VnbWVudD86IHN0cmluZ1xufSkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdXNlcklkIH0gPSBhd2FpdCBhdXRoKClcbiAgICBpZiAoIXVzZXJJZCkgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVW5hdXRob3JpemVkJyB9XG4gICAgYXdhaXQgZGJDb25uZWN0KClcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IFN1cHBsaWVyLmNvdW50RG9jdW1lbnRzKClcbiAgICBjb25zdCBzdXBwbGllcklkID0gYFNVUC0keyhjb3VudCArIDUwMDApLnRvU3RyaW5nKCl9YFxuICAgIGNvbnN0IHN1cHBsaWVyID0gYXdhaXQgU3VwcGxpZXIuY3JlYXRlKHtcbiAgICAgIHN1cHBsaWVySWQsXG4gICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICBhcHByb3ZlZDogZmFsc2UsXG4gICAgICBvd25lclVzZXJJZDogdXNlcklkLFxuICAgICAgY2F0ZWdvcnk6IGRhdGEuY2F0ZWdvcnkgfHwgJ0dlbmVyYWwnLFxuICAgICAgcmVnaW9uOiBkYXRhLnJlZ2lvbiB8fCAnR2xvYmFsJyxcbiAgICAgIHNlZ21lbnQ6IGRhdGEuc2VnbWVudCB8fCAnU3RhbmRhcmQnLFxuICAgICAgb25ib2FyZGluZzoge1xuICAgICAgICBjb250YWN0UGVyc29uOiBkYXRhLmNvbnRhY3RQZXJzb24gfHwgJycsXG4gICAgICAgIHBob25lOiBkYXRhLnBob25lIHx8ICcnLFxuICAgICAgICBlbWFpbDogZGF0YS5lbWFpbCB8fCAnJyxcbiAgICAgICAgZ29vZHNUeXBlOiBkYXRhLmdvb2RzVHlwZSB8fCAnJyxcbiAgICAgICAgcHJvZHVjdENhdGVnb3JpZXM6IEFycmF5LmlzQXJyYXkoZGF0YS5wcm9kdWN0Q2F0ZWdvcmllcykgPyBkYXRhLnByb2R1Y3RDYXRlZ29yaWVzIDogW10sXG4gICAgICAgIHN1cHBseUFyZWFzOiBBcnJheS5pc0FycmF5KGRhdGEuc3VwcGx5QXJlYXMpID8gZGF0YS5zdXBwbHlBcmVhcyA6IFtdLFxuICAgICAgICBkZWxpdmVyeVRpbWVsaW5lOiBkYXRhLmRlbGl2ZXJ5VGltZWxpbmUgfHwgJycsXG4gICAgICAgIHByaWNlTGlzdFVwbG9hZHM6IEFycmF5LmlzQXJyYXkoZGF0YS5wcmljZUxpc3RVcGxvYWRzKSA/IGRhdGEucHJpY2VMaXN0VXBsb2FkcyA6IFtdLFxuICAgICAgICByZWdpc3RyYXRpb25DZXJ0aWZpY2F0ZVVwbG9hZHM6IEFycmF5LmlzQXJyYXkoZGF0YS5yZWdpc3RyYXRpb25DZXJ0aWZpY2F0ZVVwbG9hZHMpID8gZGF0YS5yZWdpc3RyYXRpb25DZXJ0aWZpY2F0ZVVwbG9hZHMgOiBbXSxcbiAgICAgICAgYnVzaW5lc3NSZWdpc3RyYXRpb25DZXJ0aWZpY2F0ZVVwbG9hZHM6IEFycmF5LmlzQXJyYXkoZGF0YS5idXNpbmVzc1JlZ2lzdHJhdGlvbkNlcnRpZmljYXRlVXBsb2FkcykgPyBkYXRhLmJ1c2luZXNzUmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVVcGxvYWRzIDogW10sXG4gICAgICAgIHRheENsZWFyYW5jZUNlcnRpZmljYXRlVXBsb2FkczogQXJyYXkuaXNBcnJheShkYXRhLnRheENsZWFyYW5jZUNlcnRpZmljYXRlVXBsb2FkcykgPyBkYXRhLnRheENsZWFyYW5jZUNlcnRpZmljYXRlVXBsb2FkcyA6IFtdLFxuICAgICAgICBnc3RWYXRSZWdpc3RyYXRpb25DZXJ0aWZpY2F0ZVVwbG9hZHM6IEFycmF5LmlzQXJyYXkoZGF0YS5nc3RWYXRSZWdpc3RyYXRpb25DZXJ0aWZpY2F0ZVVwbG9hZHMpID8gZGF0YS5nc3RWYXRSZWdpc3RyYXRpb25DZXJ0aWZpY2F0ZVVwbG9hZHMgOiBbXSxcbiAgICAgICAgYnVzaW5lc3NMaWNlbnNlVXBsb2FkczogQXJyYXkuaXNBcnJheShkYXRhLmJ1c2luZXNzTGljZW5zZVVwbG9hZHMpID8gZGF0YS5idXNpbmVzc0xpY2Vuc2VVcGxvYWRzIDogW10sXG4gICAgICAgIG5hc3NpdENlcnRpZmljYXRlVXBsb2FkczogQXJyYXkuaXNBcnJheShkYXRhLm5hc3NpdENlcnRpZmljYXRlVXBsb2FkcykgPyBkYXRhLm5hc3NpdENlcnRpZmljYXRlVXBsb2FkcyA6IFtdLFxuICAgICAgICBzZWN0b3JTcGVjaWZpY0NlcnRpZmljYXRlVXBsb2FkczogQXJyYXkuaXNBcnJheShkYXRhLnNlY3RvclNwZWNpZmljQ2VydGlmaWNhdGVVcGxvYWRzKSA/IGRhdGEuc2VjdG9yU3BlY2lmaWNDZXJ0aWZpY2F0ZVVwbG9hZHMgOiBbXSxcbiAgICAgICAgcGF5bWVudE1ldGhvZHM6IEFycmF5LmlzQXJyYXkoZGF0YS5wYXltZW50TWV0aG9kcykgPyBkYXRhLnBheW1lbnRNZXRob2RzIDogW10sXG4gICAgICAgIGJhbmtEZXRhaWxzOiB7XG4gICAgICAgICAgYmFua05hbWU6IGRhdGEuYmFua0RldGFpbHM/LmJhbmtOYW1lIHx8ICcnLFxuICAgICAgICAgIGFjY291bnROYW1lOiBkYXRhLmJhbmtEZXRhaWxzPy5hY2NvdW50TmFtZSB8fCAnJyxcbiAgICAgICAgICBhY2NvdW50TnVtYmVyOiBkYXRhLmJhbmtEZXRhaWxzPy5hY2NvdW50TnVtYmVyIHx8ICcnLFxuICAgICAgICAgIHByZWZlcnNDYXNoOiBCb29sZWFuKGRhdGEuYmFua0RldGFpbHM/LnByZWZlcnNDYXNoKSxcbiAgICAgICAgfSxcbiAgICAgICAgZGVjbGFyYXRpb25zOiB7XG4gICAgICAgICAgaW5mb0FjY3VyYXRlOiBCb29sZWFuKGRhdGEuZGVjbGFyYXRpb25zPy5pbmZvQWNjdXJhdGUpLFxuICAgICAgICAgIGFncmVlUnVsZXM6IEJvb2xlYW4oZGF0YS5kZWNsYXJhdGlvbnM/LmFncmVlUnVsZXMpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHBlcmZvcm1hbmNlU2NvcmU6IDAsXG4gICAgICByaXNrUmF0aW5nOiAnTG93JyxcbiAgICAgIHRvdGFsU3BlbmQ6IDAsXG4gICAgfSlcblxuICAgIGNvbnN0IGNsaWVudDIgPSBhd2FpdCBjbGVya0NsaWVudCgpXG4gICAgYXdhaXQgY2xpZW50Mi51c2Vycy51cGRhdGVVc2VyKHVzZXJJZCwge1xuICAgICAgcHVibGljTWV0YWRhdGE6IHtcbiAgICAgICAgcm9sZTogJ3N1cHBsaWVyJyxcbiAgICAgICAgc3VwcGxpZXJJZCxcbiAgICAgICAgb25ib2FyZGluZ1N0YXR1czogJ3BlbmRpbmdfYWRtaW5fYXBwcm92YWwnLFxuICAgICAgICBvbmJvYXJkZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9vbmJvYXJkaW5nJylcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHN1cHBsaWVyKSkgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhaWxlZCB0byBzdWJtaXQgc3VwcGxpZXIgb25ib2FyZGluZycgfVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6ImtUQVFzQiJ9
}),
"[project]/lib/actions/data:97fab0 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40b533b5a49f64416e62ca9e75858712f207a9ba1d":"submitSupplierOnboarding"},"lib/actions/onboarding-actions.ts",""] */ __turbopack_context__.s([
    "submitSupplierOnboarding",
    ()=>submitSupplierOnboarding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var submitSupplierOnboarding = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("40b533b5a49f64416e62ca9e75858712f207a9ba1d", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "submitSupplierOnboarding"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vb25ib2FyZGluZy1hY3Rpb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc2VydmVyJ1xuXG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gJ25leHQvY2FjaGUnXG5pbXBvcnQgeyBhdXRoLCBjbGVya0NsaWVudCB9IGZyb20gJ0BjbGVyay9uZXh0anMvc2VydmVyJ1xuaW1wb3J0IGRiQ29ubmVjdCBmcm9tICdAL2xpYi9tb25nb2RiJ1xuaW1wb3J0IHsgU3VwcGxpZXIgfSBmcm9tICcuLi9tb2RlbHMvU3VwcGxpZXInXG5pbXBvcnQgeyBDb21wYW55IH0gZnJvbSAnLi4vbW9kZWxzL0NvbXBhbnknXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdWJtaXRDb21wYW55T25ib2FyZGluZyhkYXRhOiB7XG4gIGNvbXBhbnlOYW1lOiBzdHJpbmdcbiAgaW5kdXN0cnk/OiBzdHJpbmdcbiAgcmVnaW9uPzogc3RyaW5nXG4gIHNpemU/OiBzdHJpbmdcbiAgY29udGFjdEVtYWlsPzogc3RyaW5nXG4gIG9yZ2FuaXphdGlvblR5cGU/OiBzdHJpbmdcbiAgYWRkcmVzcz86IHN0cmluZ1xuICBvZmZpY2lhbEVtYWlsPzogc3RyaW5nXG4gIGNvbXBhbnlQaG9uZT86IHN0cmluZ1xuICB3ZWJzaXRlPzogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb25OYW1lPzogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb25Sb2xlPzogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb25QaG9uZT86IHN0cmluZ1xuICBjb250YWN0UGVyc29uRW1haWw/OiBzdHJpbmdcbiAgYnVzaW5lc3NEZXNjcmlwdGlvbj86IHN0cmluZ1xuICBoYXNCcmFuY2hlcz86IGJvb2xlYW5cbiAgbnVtYmVyT2ZCcmFuY2hlcz86IG51bWJlclxuICBicmFuY2hMb2NhdGlvbnM/OiBzdHJpbmdcbiAgY2VudHJhbFN0b3JlPzogc3RyaW5nXG4gIHByb2N1cmVtZW50TWV0aG9kPzogc3RyaW5nXG4gIHJlcXVpcmVzQXBwcm92YWxXb3JrZmxvd3M/OiBib29sZWFuXG4gIGFwcHJvdmFsTGV2ZWxzPzogc3RyaW5nW11cbiAgbWFuYWdlck5hbWU/OiBzdHJpbmdcbiAgbWFuYWdlclBvc2l0aW9uPzogc3RyaW5nXG4gIG1hbmFnZXJFbWFpbD86IHN0cmluZ1xuICBlbXBsb3llZUFjY2Vzc0NvdW50Pzogc3RyaW5nXG4gIGRlcGFydG1lbnRzPzogc3RyaW5nW11cbiAgb3RoZXJEZXBhcnRtZW50Pzogc3RyaW5nXG4gIHJlZ2lzdHJhdGlvblVwbG9hZHM/OiB7IG5hbWU6IHN0cmluZzsgc2l6ZTogbnVtYmVyOyB0eXBlOiBzdHJpbmcgfVtdXG4gIHRpbj86IHN0cmluZ1xuICBsb2dvVXBsb2Fkcz86IHsgbmFtZTogc3RyaW5nOyBzaXplOiBudW1iZXI7IHR5cGU6IHN0cmluZyB9W11cbiAgdmVuZG9yc1NlbGZPbmJvYXJkPzogc3RyaW5nXG4gIHRlbmRlcmluZ0VuYWJsZWQ/OiBib29sZWFuXG4gIGVJbnZvaWNpbmdFbmFibGVkPzogYm9vbGVhblxuICBhbmFseXRpY3NFbmFibGVkPzogYm9vbGVhblxuICBzeXN0ZW1NYW5hZ2VyTmFtZT86IHN0cmluZ1xuICBzeXN0ZW1NYW5hZ2VyUm9sZT86IHN0cmluZ1xuICBpbnZvaWNlc0FwcHJvdmVyPzogc3RyaW5nXG4gIHBvQXBwcm92ZXI/OiBzdHJpbmdcbiAgZ29vZHNSZWNlaXZlcj86IHN0cmluZ1xuICBwcm9qZWN0TGVhZD86IHN0cmluZ1xuICB0cmFpbmluZ09mZmljZXI/OiBzdHJpbmdcbiAgZGVjbGFyYXRpb25JbmZvQWNjdXJhdGU/OiBib29sZWFuXG4gIGRlY2xhcmF0aW9uQWdyZWVPbmJvYXJkaW5nPzogYm9vbGVhblxufSkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdXNlcklkIH0gPSBhd2FpdCBhdXRoKClcbiAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVW5hdXRob3JpemVkJyB9XG4gICAgfVxuXG4gICAgYXdhaXQgZGJDb25uZWN0KClcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IENvbXBhbnkuY291bnREb2N1bWVudHMoKVxuICAgIGNvbnN0IGNvbXBhbnlJZCA9IGBDT01QLSR7KGNvdW50ICsgMTAwMCkudG9TdHJpbmcoKX1gXG5cbiAgICBhd2FpdCBDb21wYW55LmNyZWF0ZSh7XG4gICAgICBjb21wYW55SWQsXG4gICAgICBuYW1lOiBkYXRhLmNvbXBhbnlOYW1lLFxuICAgICAgYXBwcm92ZWQ6IGZhbHNlLFxuICAgICAgaW5kdXN0cnk6IGRhdGEuaW5kdXN0cnkgfHwgJycsXG4gICAgICByZWdpb246IGRhdGEucmVnaW9uIHx8ICcnLFxuICAgICAgc2l6ZTogZGF0YS5zaXplIHx8ICcnLFxuICAgICAgY29udGFjdEVtYWlsOiBkYXRhLmNvbnRhY3RFbWFpbCB8fCAnJyxcbiAgICAgIG93bmVyVXNlcklkOiB1c2VySWQsXG4gICAgICBvbmJvYXJkaW5nOiB7XG4gICAgICAgIGNvbXBhbnlJbmZvcm1hdGlvbjoge1xuICAgICAgICAgIG9yZ2FuaXphdGlvblR5cGU6IGRhdGEub3JnYW5pemF0aW9uVHlwZSB8fCAnJyxcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MgfHwgJycsXG4gICAgICAgICAgb2ZmaWNpYWxFbWFpbDogZGF0YS5vZmZpY2lhbEVtYWlsIHx8ICcnLFxuICAgICAgICAgIHBob25lOiBkYXRhLmNvbXBhbnlQaG9uZSB8fCAnJyxcbiAgICAgICAgICB3ZWJzaXRlOiBkYXRhLndlYnNpdGUgfHwgJycsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRhY3RQZXJzb246IHtcbiAgICAgICAgICBuYW1lOiBkYXRhLmNvbnRhY3RQZXJzb25OYW1lIHx8ICcnLFxuICAgICAgICAgIHJvbGU6IGRhdGEuY29udGFjdFBlcnNvblJvbGUgfHwgJycsXG4gICAgICAgICAgcGhvbmU6IGRhdGEuY29udGFjdFBlcnNvblBob25lIHx8ICcnLFxuICAgICAgICAgIGVtYWlsOiBkYXRhLmNvbnRhY3RQZXJzb25FbWFpbCB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgYnVzaW5lc3NPcGVyYXRpb25zOiB7XG4gICAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuYnVzaW5lc3NEZXNjcmlwdGlvbiB8fCAnJyxcbiAgICAgICAgICBoYXNCcmFuY2hlczogQm9vbGVhbihkYXRhLmhhc0JyYW5jaGVzKSxcbiAgICAgICAgICBudW1iZXJPZkJyYW5jaGVzOiB0eXBlb2YgZGF0YS5udW1iZXJPZkJyYW5jaGVzID09PSAnbnVtYmVyJyA/IGRhdGEubnVtYmVyT2ZCcmFuY2hlcyA6IDAsXG4gICAgICAgICAgYnJhbmNoTG9jYXRpb25zOiBkYXRhLmJyYW5jaExvY2F0aW9ucyB8fCAnJyxcbiAgICAgICAgICBjZW50cmFsU3RvcmU6IGRhdGEuY2VudHJhbFN0b3JlIHx8ICcnLFxuICAgICAgICB9LFxuICAgICAgICBwcm9jdXJlbWVudFN0cnVjdHVyZToge1xuICAgICAgICAgIGN1cnJlbnRNZXRob2Q6IGRhdGEucHJvY3VyZW1lbnRNZXRob2QgfHwgJycsXG4gICAgICAgICAgcmVxdWlyZXNBcHByb3ZhbFdvcmtmbG93czogQm9vbGVhbihkYXRhLnJlcXVpcmVzQXBwcm92YWxXb3JrZmxvd3MpLFxuICAgICAgICAgIGFwcHJvdmFsTGV2ZWxzOiBBcnJheS5pc0FycmF5KGRhdGEuYXBwcm92YWxMZXZlbHMpID8gZGF0YS5hcHByb3ZhbExldmVscyA6IFtdLFxuICAgICAgICAgIG1hbmFnZXI6IHtcbiAgICAgICAgICAgIG5hbWU6IGRhdGEubWFuYWdlck5hbWUgfHwgJycsXG4gICAgICAgICAgICBwb3NpdGlvbjogZGF0YS5tYW5hZ2VyUG9zaXRpb24gfHwgJycsXG4gICAgICAgICAgICBlbWFpbDogZGF0YS5tYW5hZ2VyRW1haWwgfHwgJycsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgdXNlclNldHVwOiB7XG4gICAgICAgICAgZW1wbG95ZWVBY2Nlc3NDb3VudDogZGF0YS5lbXBsb3llZUFjY2Vzc0NvdW50IHx8ICcnLFxuICAgICAgICAgIGRlcGFydG1lbnRzOiBBcnJheS5pc0FycmF5KGRhdGEuZGVwYXJ0bWVudHMpID8gZGF0YS5kZXBhcnRtZW50cyA6IFtdLFxuICAgICAgICAgIG90aGVyRGVwYXJ0bWVudDogZGF0YS5vdGhlckRlcGFydG1lbnQgfHwgJycsXG4gICAgICAgIH0sXG4gICAgICAgIGRvY3VtZW50czoge1xuICAgICAgICAgIHJlZ2lzdHJhdGlvblVwbG9hZHM6IEFycmF5LmlzQXJyYXkoZGF0YS5yZWdpc3RyYXRpb25VcGxvYWRzKSA/IGRhdGEucmVnaXN0cmF0aW9uVXBsb2FkcyA6IFtdLFxuICAgICAgICAgIHRpbjogZGF0YS50aW4gfHwgJycsXG4gICAgICAgICAgbG9nb1VwbG9hZHM6IEFycmF5LmlzQXJyYXkoZGF0YS5sb2dvVXBsb2FkcykgPyBkYXRhLmxvZ29VcGxvYWRzIDogW10sXG4gICAgICAgIH0sXG4gICAgICAgIHN5c3RlbUNvbmZpZ3VyYXRpb246IHtcbiAgICAgICAgICB2ZW5kb3JzU2VsZk9uYm9hcmQ6IGRhdGEudmVuZG9yc1NlbGZPbmJvYXJkIHx8ICcnLFxuICAgICAgICAgIHRlbmRlcmluZ0VuYWJsZWQ6IEJvb2xlYW4oZGF0YS50ZW5kZXJpbmdFbmFibGVkKSxcbiAgICAgICAgICBlSW52b2ljaW5nRW5hYmxlZDogQm9vbGVhbihkYXRhLmVJbnZvaWNpbmdFbmFibGVkKSxcbiAgICAgICAgICBhbmFseXRpY3NFbmFibGVkOiBCb29sZWFuKGRhdGEuYW5hbHl0aWNzRW5hYmxlZCksXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3BvbnNpYmlsaXRpZXM6IHtcbiAgICAgICAgICBzeXN0ZW1NYW5hZ2VyTmFtZTogZGF0YS5zeXN0ZW1NYW5hZ2VyTmFtZSB8fCAnJyxcbiAgICAgICAgICBzeXN0ZW1NYW5hZ2VyUm9sZTogZGF0YS5zeXN0ZW1NYW5hZ2VyUm9sZSB8fCAnJyxcbiAgICAgICAgICBpbnZvaWNlc0FwcHJvdmVyOiBkYXRhLmludm9pY2VzQXBwcm92ZXIgfHwgJycsXG4gICAgICAgICAgcG9BcHByb3ZlcjogZGF0YS5wb0FwcHJvdmVyIHx8ICcnLFxuICAgICAgICAgIGdvb2RzUmVjZWl2ZXI6IGRhdGEuZ29vZHNSZWNlaXZlciB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgdGVhbU1lbWJlcnM6IHtcbiAgICAgICAgICBwcm9qZWN0TGVhZDogZGF0YS5wcm9qZWN0TGVhZCB8fCAnJyxcbiAgICAgICAgICB0cmFpbmluZ09mZmljZXI6IGRhdGEudHJhaW5pbmdPZmZpY2VyIHx8ICcnLFxuICAgICAgICB9LFxuICAgICAgICBkZWNsYXJhdGlvbnM6IHtcbiAgICAgICAgICBpbmZvQWNjdXJhdGU6IEJvb2xlYW4oZGF0YS5kZWNsYXJhdGlvbkluZm9BY2N1cmF0ZSksXG4gICAgICAgICAgYWdyZWVPbmJvYXJkaW5nOiBCb29sZWFuKGRhdGEuZGVjbGFyYXRpb25BZ3JlZU9uYm9hcmRpbmcpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgY2xlcmtDbGllbnQoKVxuICAgIGF3YWl0IGNsaWVudC51c2Vycy51cGRhdGVVc2VyKHVzZXJJZCwge1xuICAgICAgcHVibGljTWV0YWRhdGE6IHtcbiAgICAgICAgcm9sZTogJ2NvbXBhbnknLFxuICAgICAgICBjb21wYW55SWQsXG4gICAgICAgIG9uYm9hcmRpbmdTdGF0dXM6ICdwZW5kaW5nX2FkbWluX2FwcHJvdmFsJyxcbiAgICAgICAgY29tcGFueToge1xuICAgICAgICAgIG5hbWU6IGRhdGEuY29tcGFueU5hbWUsXG4gICAgICAgICAgaW5kdXN0cnk6IGRhdGEuaW5kdXN0cnkgfHwgJycsXG4gICAgICAgICAgcmVnaW9uOiBkYXRhLnJlZ2lvbiB8fCAnJyxcbiAgICAgICAgICBzaXplOiBkYXRhLnNpemUgfHwgJycsXG4gICAgICAgICAgY29udGFjdEVtYWlsOiBkYXRhLmNvbnRhY3RFbWFpbCB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgb25ib2FyZGVkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIHJldmFsaWRhdGVQYXRoKCcvb25ib2FyZGluZycpXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogeyBjb21wYW55SWQgfSB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRmFpbGVkIHRvIHN1Ym1pdCBjb21wYW55IG9uYm9hcmRpbmcnIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3VibWl0U3VwcGxpZXJPbmJvYXJkaW5nKGRhdGE6IHtcbiAgbmFtZTogc3RyaW5nXG4gIGNvbnRhY3RQZXJzb24/OiBzdHJpbmdcbiAgcGhvbmU/OiBzdHJpbmdcbiAgZW1haWw/OiBzdHJpbmdcbiAgZ29vZHNUeXBlPzogc3RyaW5nXG4gIHByb2R1Y3RDYXRlZ29yaWVzPzogc3RyaW5nW11cbiAgc3VwcGx5QXJlYXM/OiBzdHJpbmdbXVxuICBkZWxpdmVyeVRpbWVsaW5lPzogc3RyaW5nXG4gIHByaWNlTGlzdFVwbG9hZHM/OiB7IG5hbWU6IHN0cmluZzsgc2l6ZTogbnVtYmVyOyB0eXBlOiBzdHJpbmcgfVtdXG4gIHJlZ2lzdHJhdGlvbkNlcnRpZmljYXRlVXBsb2Fkcz86IHsgbmFtZTogc3RyaW5nOyBzaXplOiBudW1iZXI7IHR5cGU6IHN0cmluZyB9W11cbiAgYnVzaW5lc3NSZWdpc3RyYXRpb25DZXJ0aWZpY2F0ZVVwbG9hZHM/OiB7IG5hbWU6IHN0cmluZzsgc2l6ZTogbnVtYmVyOyB0eXBlOiBzdHJpbmcgfVtdXG4gIHRheENsZWFyYW5jZUNlcnRpZmljYXRlVXBsb2Fkcz86IHsgbmFtZTogc3RyaW5nOyBzaXplOiBudW1iZXI7IHR5cGU6IHN0cmluZyB9W11cbiAgZ3N0VmF0UmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVVcGxvYWRzPzogeyBuYW1lOiBzdHJpbmc7IHNpemU6IG51bWJlcjsgdHlwZTogc3RyaW5nIH1bXVxuICBidXNpbmVzc0xpY2Vuc2VVcGxvYWRzPzogeyBuYW1lOiBzdHJpbmc7IHNpemU6IG51bWJlcjsgdHlwZTogc3RyaW5nIH1bXVxuICBuYXNzaXRDZXJ0aWZpY2F0ZVVwbG9hZHM/OiB7IG5hbWU6IHN0cmluZzsgc2l6ZTogbnVtYmVyOyB0eXBlOiBzdHJpbmcgfVtdXG4gIHNlY3RvclNwZWNpZmljQ2VydGlmaWNhdGVVcGxvYWRzPzogeyBuYW1lOiBzdHJpbmc7IHNpemU6IG51bWJlcjsgdHlwZTogc3RyaW5nIH1bXVxuICBwYXltZW50TWV0aG9kcz86IHN0cmluZ1tdXG4gIGJhbmtEZXRhaWxzPzogeyBiYW5rTmFtZT86IHN0cmluZzsgYWNjb3VudE5hbWU/OiBzdHJpbmc7IGFjY291bnROdW1iZXI/OiBzdHJpbmc7IHByZWZlcnNDYXNoPzogYm9vbGVhbiB9XG4gIGRlY2xhcmF0aW9ucz86IHsgaW5mb0FjY3VyYXRlPzogYm9vbGVhbjsgYWdyZWVSdWxlcz86IGJvb2xlYW4gfVxuICBjYXRlZ29yeT86IHN0cmluZ1xuICByZWdpb24/OiBzdHJpbmdcbiAgc2VnbWVudD86IHN0cmluZ1xufSkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdXNlcklkIH0gPSBhd2FpdCBhdXRoKClcbiAgICBpZiAoIXVzZXJJZCkgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnVW5hdXRob3JpemVkJyB9XG4gICAgYXdhaXQgZGJDb25uZWN0KClcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IFN1cHBsaWVyLmNvdW50RG9jdW1lbnRzKClcbiAgICBjb25zdCBzdXBwbGllcklkID0gYFNVUC0keyhjb3VudCArIDUwMDApLnRvU3RyaW5nKCl9YFxuICAgIGNvbnN0IHN1cHBsaWVyID0gYXdhaXQgU3VwcGxpZXIuY3JlYXRlKHtcbiAgICAgIHN1cHBsaWVySWQsXG4gICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICBhcHByb3ZlZDogZmFsc2UsXG4gICAgICBvd25lclVzZXJJZDogdXNlcklkLFxuICAgICAgY2F0ZWdvcnk6IGRhdGEuY2F0ZWdvcnkgfHwgJ0dlbmVyYWwnLFxuICAgICAgcmVnaW9uOiBkYXRhLnJlZ2lvbiB8fCAnR2xvYmFsJyxcbiAgICAgIHNlZ21lbnQ6IGRhdGEuc2VnbWVudCB8fCAnU3RhbmRhcmQnLFxuICAgICAgb25ib2FyZGluZzoge1xuICAgICAgICBjb250YWN0UGVyc29uOiBkYXRhLmNvbnRhY3RQZXJzb24gfHwgJycsXG4gICAgICAgIHBob25lOiBkYXRhLnBob25lIHx8ICcnLFxuICAgICAgICBlbWFpbDogZGF0YS5lbWFpbCB8fCAnJyxcbiAgICAgICAgZ29vZHNUeXBlOiBkYXRhLmdvb2RzVHlwZSB8fCAnJyxcbiAgICAgICAgcHJvZHVjdENhdGVnb3JpZXM6IEFycmF5LmlzQXJyYXkoZGF0YS5wcm9kdWN0Q2F0ZWdvcmllcykgPyBkYXRhLnByb2R1Y3RDYXRlZ29yaWVzIDogW10sXG4gICAgICAgIHN1cHBseUFyZWFzOiBBcnJheS5pc0FycmF5KGRhdGEuc3VwcGx5QXJlYXMpID8gZGF0YS5zdXBwbHlBcmVhcyA6IFtdLFxuICAgICAgICBkZWxpdmVyeVRpbWVsaW5lOiBkYXRhLmRlbGl2ZXJ5VGltZWxpbmUgfHwgJycsXG4gICAgICAgIHByaWNlTGlzdFVwbG9hZHM6IEFycmF5LmlzQXJyYXkoZGF0YS5wcmljZUxpc3RVcGxvYWRzKSA/IGRhdGEucHJpY2VMaXN0VXBsb2FkcyA6IFtdLFxuICAgICAgICByZWdpc3RyYXRpb25DZXJ0aWZpY2F0ZVVwbG9hZHM6IEFycmF5LmlzQXJyYXkoZGF0YS5yZWdpc3RyYXRpb25DZXJ0aWZpY2F0ZVVwbG9hZHMpID8gZGF0YS5yZWdpc3RyYXRpb25DZXJ0aWZpY2F0ZVVwbG9hZHMgOiBbXSxcbiAgICAgICAgYnVzaW5lc3NSZWdpc3RyYXRpb25DZXJ0aWZpY2F0ZVVwbG9hZHM6IEFycmF5LmlzQXJyYXkoZGF0YS5idXNpbmVzc1JlZ2lzdHJhdGlvbkNlcnRpZmljYXRlVXBsb2FkcykgPyBkYXRhLmJ1c2luZXNzUmVnaXN0cmF0aW9uQ2VydGlmaWNhdGVVcGxvYWRzIDogW10sXG4gICAgICAgIHRheENsZWFyYW5jZUNlcnRpZmljYXRlVXBsb2FkczogQXJyYXkuaXNBcnJheShkYXRhLnRheENsZWFyYW5jZUNlcnRpZmljYXRlVXBsb2FkcykgPyBkYXRhLnRheENsZWFyYW5jZUNlcnRpZmljYXRlVXBsb2FkcyA6IFtdLFxuICAgICAgICBnc3RWYXRSZWdpc3RyYXRpb25DZXJ0aWZpY2F0ZVVwbG9hZHM6IEFycmF5LmlzQXJyYXkoZGF0YS5nc3RWYXRSZWdpc3RyYXRpb25DZXJ0aWZpY2F0ZVVwbG9hZHMpID8gZGF0YS5nc3RWYXRSZWdpc3RyYXRpb25DZXJ0aWZpY2F0ZVVwbG9hZHMgOiBbXSxcbiAgICAgICAgYnVzaW5lc3NMaWNlbnNlVXBsb2FkczogQXJyYXkuaXNBcnJheShkYXRhLmJ1c2luZXNzTGljZW5zZVVwbG9hZHMpID8gZGF0YS5idXNpbmVzc0xpY2Vuc2VVcGxvYWRzIDogW10sXG4gICAgICAgIG5hc3NpdENlcnRpZmljYXRlVXBsb2FkczogQXJyYXkuaXNBcnJheShkYXRhLm5hc3NpdENlcnRpZmljYXRlVXBsb2FkcykgPyBkYXRhLm5hc3NpdENlcnRpZmljYXRlVXBsb2FkcyA6IFtdLFxuICAgICAgICBzZWN0b3JTcGVjaWZpY0NlcnRpZmljYXRlVXBsb2FkczogQXJyYXkuaXNBcnJheShkYXRhLnNlY3RvclNwZWNpZmljQ2VydGlmaWNhdGVVcGxvYWRzKSA/IGRhdGEuc2VjdG9yU3BlY2lmaWNDZXJ0aWZpY2F0ZVVwbG9hZHMgOiBbXSxcbiAgICAgICAgcGF5bWVudE1ldGhvZHM6IEFycmF5LmlzQXJyYXkoZGF0YS5wYXltZW50TWV0aG9kcykgPyBkYXRhLnBheW1lbnRNZXRob2RzIDogW10sXG4gICAgICAgIGJhbmtEZXRhaWxzOiB7XG4gICAgICAgICAgYmFua05hbWU6IGRhdGEuYmFua0RldGFpbHM/LmJhbmtOYW1lIHx8ICcnLFxuICAgICAgICAgIGFjY291bnROYW1lOiBkYXRhLmJhbmtEZXRhaWxzPy5hY2NvdW50TmFtZSB8fCAnJyxcbiAgICAgICAgICBhY2NvdW50TnVtYmVyOiBkYXRhLmJhbmtEZXRhaWxzPy5hY2NvdW50TnVtYmVyIHx8ICcnLFxuICAgICAgICAgIHByZWZlcnNDYXNoOiBCb29sZWFuKGRhdGEuYmFua0RldGFpbHM/LnByZWZlcnNDYXNoKSxcbiAgICAgICAgfSxcbiAgICAgICAgZGVjbGFyYXRpb25zOiB7XG4gICAgICAgICAgaW5mb0FjY3VyYXRlOiBCb29sZWFuKGRhdGEuZGVjbGFyYXRpb25zPy5pbmZvQWNjdXJhdGUpLFxuICAgICAgICAgIGFncmVlUnVsZXM6IEJvb2xlYW4oZGF0YS5kZWNsYXJhdGlvbnM/LmFncmVlUnVsZXMpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHBlcmZvcm1hbmNlU2NvcmU6IDAsXG4gICAgICByaXNrUmF0aW5nOiAnTG93JyxcbiAgICAgIHRvdGFsU3BlbmQ6IDAsXG4gICAgfSlcblxuICAgIGNvbnN0IGNsaWVudDIgPSBhd2FpdCBjbGVya0NsaWVudCgpXG4gICAgYXdhaXQgY2xpZW50Mi51c2Vycy51cGRhdGVVc2VyKHVzZXJJZCwge1xuICAgICAgcHVibGljTWV0YWRhdGE6IHtcbiAgICAgICAgcm9sZTogJ3N1cHBsaWVyJyxcbiAgICAgICAgc3VwcGxpZXJJZCxcbiAgICAgICAgb25ib2FyZGluZ1N0YXR1czogJ3BlbmRpbmdfYWRtaW5fYXBwcm92YWwnLFxuICAgICAgICBvbmJvYXJkZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9vbmJvYXJkaW5nJylcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHN1cHBsaWVyKSkgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ0ZhaWxlZCB0byBzdWJtaXQgc3VwcGxpZXIgb25ib2FyZGluZycgfVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Im1UQWtLc0IifQ==
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/textarea.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/radio-group.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/checkbox.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/separator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$status$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/status-badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$38813f__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/lib/actions/data:38813f [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$97fab0__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/lib/actions/data:97fab0 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-ssr] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
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
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$38813f__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["submitCompanyOnboarding"])({
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
        const businessRegistrationCertificateUploads = businessRegCertFiles ? Array.from(businessRegCertFiles).map((f)=>({
                name: f.name,
                size: f.size,
                type: f.type
            })) : [];
        const taxClearanceCertificateUploads = taxClearanceFiles ? Array.from(taxClearanceFiles).map((f)=>({
                name: f.name,
                size: f.size,
                type: f.type
            })) : [];
        const gstVatRegistrationCertificateUploads = gstVatFiles ? Array.from(gstVatFiles).map((f)=>({
                name: f.name,
                size: f.size,
                type: f.type
            })) : [];
        const businessLicenseUploads = businessLicenseFiles ? Array.from(businessLicenseFiles).map((f)=>({
                name: f.name,
                size: f.size,
                type: f.type
            })) : [];
        const nassitCertificateUploads = nassitFiles ? Array.from(nassitFiles).map((f)=>({
                name: f.name,
                size: f.size,
                type: f.type
            })) : [];
        const sectorSpecificCertificateUploads = sectorCertFiles ? Array.from(sectorCertFiles).map((f)=>({
                name: f.name,
                size: f.size,
                type: f.type
            })) : [];
        const registrationCertificateUploads = [
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
        const supplyAreas = supplyAreasText.split(",").map((s)=>s.trim()).filter(Boolean);
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$data$3a$97fab0__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["submitSupplierOnboarding"])({
            name: supplierName,
            contactPerson,
            phone,
            email,
            productCategories,
            supplyAreas,
            deliveryTimeline,
            registrationCertificateUploads,
            businessRegistrationCertificateUploads,
            taxClearanceCertificateUploads,
            gstVatRegistrationCertificateUploads,
            businessLicenseUploads,
            nassitCertificateUploads,
            sectorSpecificCertificateUploads,
            paymentMethods,
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
        className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/30 via-background to-muted/20 p-4 sm:p-6 lg:p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-3xl",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "shadow-lg border-border/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "text-base",
                                            children: "Welcome "
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 156,
                                            columnNumber: 1
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                                            className: "text-xs",
                                            children: "Select your role and complete onboarding. "
                                        }, void 0, false, {
                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                            lineNumber: 159,
                                            columnNumber: 1
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 155,
                                    columnNumber: 1
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$status$2d$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                    status: role ? role : "Select role"
                                }, void 0, false, {
                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                    lineNumber: 164,
                                    columnNumber: 1
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                            lineNumber: 153,
                            columnNumber: 1
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                        lineNumber: 152,
                        columnNumber: 1
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: [
                            " ",
                            !role ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        onClick: ()=>setRole("company"),
                                        children: "I am a company"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                        lineNumber: 170,
                                        columnNumber: 1
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        onClick: ()=>setRole("supplier"),
                                        children: "I am a supplier"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                        lineNumber: 172,
                                        columnNumber: 1
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                lineNumber: 168,
                                columnNumber: 26
                            }, this) : role === "company" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                        className: "h-5 w-5 text-primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold",
                                                        children: "Company Information"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 180,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 184,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "companyName",
                                                                children: "Company Name *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 188,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                id: "companyName",
                                                                value: companyName,
                                                                onChange: (e)=>setCompanyName(e.target.value),
                                                                placeholder: "Acme Corporation"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 189,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 187,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "companyLogo",
                                                                children: "Company Logo"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 198,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3 p-4 border border-dashed border-border rounded-lg hover:border-primary/50 transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                                        className: "h-5 w-5 text-muted-foreground"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 200,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        id: "companyLogo",
                                                                        type: "file",
                                                                        multiple: true,
                                                                        accept: "image/*,.pdf,.svg,.png,.jpg",
                                                                        onChange: (e)=>setLogoUploads(e.target.files),
                                                                        className: "border-0 p-0 h-auto file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 201,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 199,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted-foreground",
                                                                children: "Accepted formats: PNG, JPG, SVG, PDF"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 210,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 197,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "organizationType",
                                                                children: "Type of Organization *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 214,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                value: organizationType,
                                                                onValueChange: setOrganizationType,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                        id: "organizationType",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                            placeholder: "Select organization type"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                            lineNumber: 217,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 216,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                value: "Sole Proprietor",
                                                                                children: "Sole Proprietor"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                lineNumber: 220,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                value: "Limited Company",
                                                                                children: "Limited Company"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                lineNumber: 221,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                value: "NGO",
                                                                                children: "NGO"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                lineNumber: 222,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                value: "ESO",
                                                                                children: "ESO"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                lineNumber: 223,
                                                                                columnNumber: 28
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                value: "Government",
                                                                                children: "Government"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                lineNumber: 224,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                value: "Other",
                                                                                children: "Other"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                lineNumber: 225,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 219,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 215,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 213,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "businessAddress",
                                                                children: "Business Address *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 231,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                                                id: "businessAddress",
                                                                value: businessAddress,
                                                                onChange: (e)=>setBusinessAddress(e.target.value),
                                                                placeholder: "Enter complete business address",
                                                                rows: 3
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 232,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 230,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                        htmlFor: "companyEmail",
                                                                        children: "Official Email Address *"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 243,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        id: "companyEmail",
                                                                        type: "email",
                                                                        value: companyOfficialEmail,
                                                                        onChange: (e)=>setCompanyOfficialEmail(e.target.value),
                                                                        placeholder: "info@company.com"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 244,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 242,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                        htmlFor: "companyPhone",
                                                                        children: "Company Phone / WhatsApp *"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 253,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        id: "companyPhone",
                                                                        type: "tel",
                                                                        value: companyPhone,
                                                                        onChange: (e)=>setCompanyPhone(e.target.value),
                                                                        placeholder: "+232 76 123 456"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 254,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 252,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 241,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "website",
                                                                children: "Official Website"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 265,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                id: "website",
                                                                type: "url",
                                                                value: website,
                                                                onChange: (e)=>setWebsite(e.target.value),
                                                                placeholder: "https://www.yourcompany.com"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 266,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                        htmlFor: "industry",
                                                                        children: "Industry *"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 277,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                        value: industry,
                                                                        onValueChange: setIndustry,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                id: "industry",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                    placeholder: "Select industry"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                    lineNumber: 280,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                lineNumber: 279,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: "Manufacturing",
                                                                                        children: "Manufacturing"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                        lineNumber: 283,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: "Technology",
                                                                                        children: "Technology"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                        lineNumber: 284,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: "Healthcare",
                                                                                        children: "Healthcare"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                        lineNumber: 285,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: "Education",
                                                                                        children: "Education"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                        lineNumber: 286,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: "Construction",
                                                                                        children: "Construction"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                        lineNumber: 287,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: "Retail",
                                                                                        children: "Retail"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                        lineNumber: 288,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: "Hospitality",
                                                                                        children: "Hospitality"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                        lineNumber: 289,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: "Other",
                                                                                        children: "Other"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                        lineNumber: 290,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                lineNumber: 282,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 278,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 276,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                        htmlFor: "size",
                                                                        children: "Company Size *"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 295,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                        value: size,
                                                                        onValueChange: setSize,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                id: "size",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                    placeholder: "Select company size"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                    lineNumber: 298,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                lineNumber: 297,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: "1-10",
                                                                                        children: "1-10 employees"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                        lineNumber: 301,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: "11-50",
                                                                                        children: "11-50 employees"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                        lineNumber: 302,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: "51-200",
                                                                                        children: "51-200 employees"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                        lineNumber: 303,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: "201-500",
                                                                                        children: "201-500 employees"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                        lineNumber: 304,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                        value: "500+",
                                                                                        children: "500+ employees"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                        lineNumber: 305,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                lineNumber: 300,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 296,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 294,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 275,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "primaryContact",
                                                                children: "Primary Contact Person *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 312,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                id: "primaryContact",
                                                                value: primaryContactName,
                                                                onChange: (e)=>setPrimaryContactName(e.target.value),
                                                                placeholder: "Jane Doe"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 313,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 311,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "businessDescription",
                                                                children: "Company Description *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 322,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                                                id: "businessDescription",
                                                                value: businessDescription,
                                                                onChange: (e)=>setBusinessDescription(e.target.value),
                                                                placeholder: "Briefly describe what your company does...",
                                                                rows: 4
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 323,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 321,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 186,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                        lineNumber: 179,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                        className: "h-5 w-5 text-primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 337,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold",
                                                        children: "Company Documents"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 338,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 336,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 340,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                        htmlFor: "companyDocs",
                                                        children: "Upload Registration & Legal Documents"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 343,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 p-4 border border-dashed border-border rounded-lg hover:border-primary/50 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                                className: "h-5 w-5 text-muted-foreground"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 345,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                id: "companyDocs",
                                                                type: "file",
                                                                multiple: true,
                                                                accept: "image/*,.pdf",
                                                                onChange: (e)=>setRegistrationUploads(e.target.files),
                                                                className: "border-0 p-0 h-auto file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 346,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 344,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-muted-foreground",
                                                        children: "Upload business registration, certificates, licenses, etc."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 355,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 342,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                        lineNumber: 335,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold",
                                                children: "Branch Information"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 363,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 364,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center space-x-3 p-4 rounded-lg border border-border bg-muted/30",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                id: "hasBranches",
                                                                checked: hasBranches,
                                                                onCheckedChange: (checked)=>setHasBranches(checked)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 368,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "hasBranches",
                                                                className: "text-sm font-medium cursor-pointer",
                                                                children: "Our company has multiple branches"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 373,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 367,
                                                        columnNumber: 21
                                                    }, this),
                                                    hasBranches && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-4 pl-4 border-l-2 border-primary/30",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                        htmlFor: "numberOfBranches",
                                                                        children: "Number of Branches *"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 381,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        id: "numberOfBranches",
                                                                        type: "number",
                                                                        min: "0",
                                                                        value: numberOfBranches,
                                                                        onChange: (e)=>setNumberOfBranches(Number(e.target.value)),
                                                                        placeholder: "0"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 382,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 380,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                        htmlFor: "branchLocations",
                                                                        children: "Branch Locations *"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 392,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                                                        id: "branchLocations",
                                                                        value: branchLocations,
                                                                        onChange: (e)=>setBranchLocations(e.target.value),
                                                                        placeholder: "Enter branch locations separated by commas (e.g., Freetown, Bo, Kenema)",
                                                                        rows: 3
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 393,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 391,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 366,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                        lineNumber: 362,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold",
                                                children: "Team Members"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 408,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 409,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "projectLead",
                                                                children: "Project Lead"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 413,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                id: "projectLead",
                                                                value: projectLead,
                                                                onChange: (e)=>setProjectLead(e.target.value),
                                                                placeholder: "John Smith"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 414,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 412,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "trainingOfficer",
                                                                children: "Training Officer / Supervisor"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 422,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                id: "trainingOfficer",
                                                                value: trainingOfficer,
                                                                onChange: (e)=>setTrainingOfficer(e.target.value),
                                                                placeholder: "Sarah Johnson"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 423,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 421,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 411,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                        lineNumber: 407,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        className: "h-5 w-5 text-primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 436,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold",
                                                        children: "Declaration & Agreement"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 437,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 435,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 439,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4 p-4 rounded-lg border border-border bg-muted/30",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start space-x-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                id: "declCompanyInfoAccurate",
                                                                checked: declCompanyInfoAccurate,
                                                                onCheckedChange: (checked)=>setDeclCompanyInfoAccurate(checked)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 443,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "declCompanyInfoAccurate",
                                                                className: "text-sm font-normal cursor-pointer leading-relaxed",
                                                                children: "I confirm that all information provided is accurate and complete to the best of my knowledge."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 448,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 442,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start space-x-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                id: "declCompanyAgree",
                                                                checked: declCompanyAgree,
                                                                onCheckedChange: (checked)=>setDeclCompanyAgree(checked)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 456,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "declCompanyAgree",
                                                                className: "text-sm font-normal cursor-pointer leading-relaxed",
                                                                children: "I agree to onboard my company onto the e-Procurement platform and abide by all terms and conditions."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 461,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 455,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 441,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                        lineNumber: 434,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3 pt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                onClick: ()=>setRole(null),
                                                className: "flex-1",
                                                children: "Back"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 471,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                onClick: submitCompany,
                                                className: "flex-1",
                                                disabled: !companyName || !declCompanyInfoAccurate || !declCompanyAgree || loading !== null,
                                                children: loading === "company" ? "Submitting..." : "Submit Application"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 474,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                        lineNumber: 470,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                lineNumber: 177,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                        className: "h-5 w-5 text-primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 488,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold",
                                                        children: "Supplier Information"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 489,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 487,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 491,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "supplierName",
                                                                children: "Supplier Name *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 495,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                id: "supplierName",
                                                                value: supplierName,
                                                                onChange: (e)=>setSupplierName(e.target.value),
                                                                placeholder: "Northwind Trading Co."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 496,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 494,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                        htmlFor: "contactPerson",
                                                                        children: "Contact Person Name *"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 506,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        id: "contactPerson",
                                                                        value: contactPerson,
                                                                        onChange: (e)=>setContactPerson(e.target.value),
                                                                        placeholder: "John Doe"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 507,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 505,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                        htmlFor: "phone",
                                                                        children: "Phone / WhatsApp *"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 515,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        id: "phone",
                                                                        type: "tel",
                                                                        value: phone,
                                                                        onChange: (e)=>setPhone(e.target.value),
                                                                        placeholder: "+232 76 123 456"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 516,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 514,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 504,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "email",
                                                                children: "Email Address *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 527,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                id: "email",
                                                                type: "email",
                                                                value: email,
                                                                onChange: (e)=>setEmail(e.target.value),
                                                                placeholder: "supplier@example.com"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 528,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 526,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 493,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                        lineNumber: 486,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold",
                                                children: "Products & Services"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 541,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 542,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                children: "Product / Service Categories *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 546,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-lg border border-border bg-muted/30",
                                                                children: [
                                                                    "Food",
                                                                    "Beverages",
                                                                    "Cleaning",
                                                                    "IT Equipment",
                                                                    "Stationeries",
                                                                    "Transport / Delivery",
                                                                    "Telecom"
                                                                ].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                                id: `cat-${cat}`,
                                                                                checked: productCategories.includes(cat),
                                                                                onCheckedChange: (checked)=>{
                                                                                    setProductCategories((prev)=>checked ? [
                                                                                            ...prev,
                                                                                            cat
                                                                                        ] : prev.filter((c)=>c !== cat));
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                lineNumber: 558,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                                htmlFor: `cat-${cat}`,
                                                                                className: "text-sm font-normal cursor-pointer",
                                                                                children: cat
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                lineNumber: 567,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, cat, true, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 557,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 547,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "supplyAreas",
                                                                children: "Areas You Can Supply / Deliver To *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 576,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                                                id: "supplyAreas",
                                                                value: supplyAreasText,
                                                                onChange: (e)=>setSupplyAreasText(e.target.value),
                                                                placeholder: "Enter delivery areas separated by commas (e.g., Freetown, Western Area, Bo)",
                                                                rows: 3
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 577,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 575,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                children: "Delivery Timeline *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 587,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                                                value: deliveryTimeline,
                                                                onValueChange: setDeliveryTimeline,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "space-y-2 p-4 rounded-lg border border-border bg-muted/30",
                                                                    children: [
                                                                        "Same day",
                                                                        "24 hours",
                                                                        "2-3 days"
                                                                    ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center space-x-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                                                    value: opt,
                                                                                    id: `delivery-${opt}`
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                    lineNumber: 592,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                                    htmlFor: `delivery-${opt}`,
                                                                                    className: "text-sm font-normal cursor-pointer",
                                                                                    children: opt
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                    lineNumber: 593,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, opt, true, {
                                                                            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                            lineNumber: 591,
                                                                            columnNumber: 29
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                    lineNumber: 589,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 588,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 586,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 544,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                        lineNumber: 540,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                        className: "h-5 w-5 text-primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 607,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold",
                                                        children: "Required Documents"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 608,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 606,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 610,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    {
                                                        label: "Business Registration Certificate",
                                                        state: businessRegCertFiles,
                                                        setter: setBusinessRegCertFiles,
                                                        id: "businessReg"
                                                    },
                                                    {
                                                        label: "Tax Clearance Certificate",
                                                        state: taxClearanceFiles,
                                                        setter: setTaxClearanceFiles,
                                                        id: "taxClearance"
                                                    },
                                                    {
                                                        label: "GST/VAT Registration Certificate",
                                                        state: gstVatFiles,
                                                        setter: setGstVatFiles,
                                                        id: "gstVat"
                                                    },
                                                    {
                                                        label: "Valid Business License",
                                                        state: businessLicenseFiles,
                                                        setter: setBusinessLicenseFiles,
                                                        id: "businessLicense"
                                                    },
                                                    {
                                                        label: "NASSIT Certificate",
                                                        state: nassitFiles,
                                                        setter: setNassitFiles,
                                                        id: "nassit"
                                                    },
                                                    {
                                                        label: "Sector-Specific Certifications (ISO, Food Handling, Safety, etc.)",
                                                        state: sectorCertFiles,
                                                        setter: setSectorCertFiles,
                                                        id: "sectorCert"
                                                    }
                                                ].map((doc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: doc.id,
                                                                children: doc.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 647,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3 p-3 border border-dashed border-border rounded-lg hover:border-primary/50 transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                                        className: "h-4 w-4 text-muted-foreground flex-shrink-0"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 649,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                        id: doc.id,
                                                                        type: "file",
                                                                        multiple: true,
                                                                        accept: "image/*,.pdf",
                                                                        onChange: (e)=>doc.setter(e.target.files),
                                                                        className: "border-0 p-0 h-auto text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 650,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 648,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, doc.id, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 646,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 612,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                        lineNumber: 605,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold",
                                                children: "Payment Information"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 666,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 667,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                children: "Accepted Payment Methods *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 671,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-lg border border-border bg-muted/30",
                                                                children: [
                                                                    "Card",
                                                                    "Mobile Money",
                                                                    "Bank"
                                                                ].map((method)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                                id: `payment-${method}`,
                                                                                checked: paymentMethods.includes(method),
                                                                                onCheckedChange: (checked)=>{
                                                                                    setPaymentMethods((prev)=>checked ? [
                                                                                            ...prev,
                                                                                            method
                                                                                        ] : prev.filter((m)=>m !== method));
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                lineNumber: 675,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                                htmlFor: `payment-${method}`,
                                                                                className: "text-sm font-normal cursor-pointer",
                                                                                children: method
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                                lineNumber: 684,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, method, true, {
                                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                        lineNumber: 674,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 672,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 670,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center space-x-3 p-4 rounded-lg border border-border bg-muted/30",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                id: "prefersCash",
                                                                checked: prefersCash,
                                                                onCheckedChange: (checked)=>setPrefersCash(checked)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 693,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "prefersCash",
                                                                className: "text-sm font-medium cursor-pointer",
                                                                children: "Vendor prefers cash payments"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 698,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 692,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 669,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                        lineNumber: 665,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        className: "h-5 w-5 text-primary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 708,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold",
                                                        children: "Declaration & Agreement"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 709,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 707,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 711,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4 p-4 rounded-lg border border-border bg-muted/30",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start space-x-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                id: "declInfoAccurate",
                                                                checked: declInfoAccurate,
                                                                onCheckedChange: (checked)=>setDeclInfoAccurate(checked)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 715,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "declInfoAccurate",
                                                                className: "text-sm font-normal cursor-pointer leading-relaxed",
                                                                children: "I confirm that all information provided is accurate and complete to the best of my knowledge."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 720,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 714,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start space-x-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                id: "declAgreeRules",
                                                                checked: declAgreeRules,
                                                                onCheckedChange: (checked)=>setDeclAgreeRules(checked)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 725,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                htmlFor: "declAgreeRules",
                                                                className: "text-sm font-normal cursor-pointer leading-relaxed",
                                                                children: "I agree to follow all procurement and delivery rules and regulations of the platform."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                                lineNumber: 730,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                        lineNumber: 724,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 713,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                        lineNumber: 706,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3 pt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                onClick: ()=>setRole(null),
                                                className: "flex-1",
                                                children: "Back"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 739,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                onClick: submitSupplier,
                                                className: "flex-1",
                                                disabled: !supplierName || !declInfoAccurate || !declAgreeRules || loading !== null,
                                                children: loading === "supplier" ? "Submitting..." : "Submit Application"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                                lineNumber: 742,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                        lineNumber: 738,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                                lineNumber: 484,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                        lineNumber: 168,
                        columnNumber: 1
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
                lineNumber: 150,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
            lineNumber: 149,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(onboard)/onboarding/OnboardingContent.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_34a92483._.js.map