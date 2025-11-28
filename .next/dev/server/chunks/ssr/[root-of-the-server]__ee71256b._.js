module.exports = [
"[externals]/mongoose [external] (mongoose, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}),
"[project]/lib/mongodb.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>connectDB
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].set('strictQuery', false);
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is not defined in .env.local");
}
// Use global to avoid re-creating connections in Next.js
let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose;
if (!cached) {
    cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose = {
        conn: null,
        promise: null
    };
}
async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(MONGODB_URI, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null;
        throw err;
    }
    return cached.conn;
}
}),
"[project]/lib/models/Requisition.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Requisition",
    ()=>Requisition
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const RequisitionSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    requisitionId: {
        type: String,
        required: true,
        unique: true
    },
    requester: {
        type: String,
        required: true
    },
    createdBy: {
        type: String
    },
    branch: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: [
            'Pending approval',
            'In review',
            'Approved',
            'Rejected'
        ],
        default: 'Pending approval'
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    neededBy: {
        type: Date
    },
    costCenter: {
        type: String
    },
    approvalRoute: {
        type: String
    },
    lineItems: [
        {
            description: String,
            quantity: Number,
            unit: String,
            unitCost: Number,
            total: Number
        }
    ],
    comments: [
        {
            author: String,
            text: String,
            date: Date
        }
    ],
    timeline: [
        {
            event: String,
            timestamp: Date,
            actor: String,
            details: String
        }
    ],
    attachments: [
        {
            filename: String,
            url: String,
            uploadedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
});
const Requisition = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Requisition || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])('Requisition', RequisitionSchema);
}),
"[project]/lib/models/Notification.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Notification",
    ()=>Notification
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const NotificationSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    userId: {
        type: String,
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: [
            'requisition_submitted',
            'requisition_approved',
            'requisition_rejected',
            'approval_pending',
            'invoice_overdue',
            'po_issued',
            'tender_response',
            'contract_expiring',
            'budget_threshold',
            'supplier_update'
        ],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    actionUrl: {
        type: String
    },
    priority: {
        type: String,
        enum: [
            'low',
            'medium',
            'high',
            'urgent'
        ],
        default: 'medium'
    },
    read: {
        type: Boolean,
        default: false
    },
    metadata: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"].Types.Mixed
    },
    expiresAt: {
        type: Date
    }
}, {
    timestamps: true
});
// Index for efficient queries
NotificationSchema.index({
    userId: 1,
    read: 1,
    createdAt: -1
});
NotificationSchema.index({
    expiresAt: 1
}, {
    expireAfterSeconds: 0
});
const Notification = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Notification || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])('Notification', NotificationSchema);
}),
"[project]/lib/actions/notification-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"008f37773f757b68eee0a8d10c65a06182beb7d58a":"getUnreadCount","00d35bb31a4fa3370aa5d4627f5c1b2a61e08eaaba":"markAllAsRead","400160c6f03959e9d1e03e6d0c71993e51653810ee":"deleteNotification","400bd1acd18e5cfd64b30244459bec588e169ed824":"getNotificationsPublic","4089033d820b625d5a4d70e588529d63a5264bd6a7":"markAsRead","40eea915777ee1ae8b0a4b42d5782c31949ee871b0":"getNotifications","40f3fd0d72378d74d66c69578905574937faf8c43f":"createNotification"},"",""] */ __turbopack_context__.s([
    "createNotification",
    ()=>createNotification,
    "deleteNotification",
    ()=>deleteNotification,
    "getNotifications",
    ()=>getNotifications,
    "getNotificationsPublic",
    ()=>getNotificationsPublic,
    "getUnreadCount",
    ()=>getUnreadCount,
    "markAllAsRead",
    ()=>markAllAsRead,
    "markAsRead",
    ()=>markAsRead
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Notification$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models/Notification.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function getNotifications(limit = 20) {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            throw new Error('Unauthorized');
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const notifications = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Notification$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Notification"].find({
            userId
        }).sort({
            createdAt: -1
        }).limit(limit).lean();
        return {
            success: true,
            data: JSON.parse(JSON.stringify(notifications))
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
async function getNotificationsPublic(limit = 20) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const notifications = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Notification$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Notification"].find({}).sort({
            createdAt: -1
        }).limit(limit).lean();
        return {
            success: true,
            data: JSON.parse(JSON.stringify(notifications))
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to fetch notifications'
        };
    }
}
async function getUnreadCount() {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            throw new Error('Unauthorized');
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const count = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Notification$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Notification"].countDocuments({
            userId,
            read: false
        });
        return {
            success: true,
            count
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
            count: 0
        };
    }
}
async function markAsRead(notificationId) {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            throw new Error('Unauthorized');
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Notification$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Notification"].findOneAndUpdate({
            _id: notificationId,
            userId
        }, {
            read: true
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/', 'layout');
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
async function markAllAsRead() {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            throw new Error('Unauthorized');
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Notification$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Notification"].updateMany({
            userId,
            read: false
        }, {
            read: true
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/', 'layout');
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
async function deleteNotification(notificationId) {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            throw new Error('Unauthorized');
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Notification$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Notification"].findOneAndDelete({
            _id: notificationId,
            userId
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/', 'layout');
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
async function createNotification(data) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const notification = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Notification$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Notification"].create(data);
        return {
            success: true,
            data: JSON.parse(JSON.stringify(notification))
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getNotifications,
    getNotificationsPublic,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    createNotification
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getNotifications, "40eea915777ee1ae8b0a4b42d5782c31949ee871b0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getNotificationsPublic, "400bd1acd18e5cfd64b30244459bec588e169ed824", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUnreadCount, "008f37773f757b68eee0a8d10c65a06182beb7d58a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(markAsRead, "4089033d820b625d5a4d70e588529d63a5264bd6a7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(markAllAsRead, "00d35bb31a4fa3370aa5d4627f5c1b2a61e08eaaba", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteNotification, "400160c6f03959e9d1e03e6d0c71993e51653810ee", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createNotification, "40f3fd0d72378d74d66c69578905574937faf8c43f", null);
}),
"[project]/lib/actions/requisition-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00f93edef6788ddd9b8af38497df494125f26e0a30":"getRequisitions","401a5cacc8acb6d6c92973fa5e0723bde9001dd60a":"getRequisitionById","40756dfcbc3f56d647b028b029195cd0a90605b2e0":"deleteRequisition","407fe89d5a3a72e1b4b59b95e3dfb924aeeef4e250":"createRequisition","6088358830acefb738fbc441f7e6c85cc5ba25a4f3":"updateRequisition"},"",""] */ __turbopack_context__.s([
    "createRequisition",
    ()=>createRequisition,
    "deleteRequisition",
    ()=>deleteRequisition,
    "getRequisitionById",
    ()=>getRequisitionById,
    "getRequisitions",
    ()=>getRequisitions,
    "updateRequisition",
    ()=>updateRequisition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Requisition$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models/Requisition.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$notification$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions/notification-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function getRequisitions() {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            return {
                success: false,
                error: 'Unauthorized'
            };
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const requisitions = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Requisition$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Requisition"].find({}).sort({
            createdAt: -1
        }).limit(50).lean();
        return {
            success: true,
            data: JSON.parse(JSON.stringify(requisitions))
        };
    } catch (error) {
        console.error('[v0] Error fetching requisitions:', error);
        return {
            success: false,
            error: 'Failed to fetch requisitions'
        };
    }
}
async function getRequisitionById(id) {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            return {
                success: false,
                error: 'Unauthorized'
            };
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const requisition = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Requisition$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Requisition"].findById(id).lean();
        if (!requisition) {
            return {
                success: false,
                error: 'Requisition not found'
            };
        }
        return {
            success: true,
            data: JSON.parse(JSON.stringify(requisition))
        };
    } catch (error) {
        console.error('[v0] Error fetching requisition:', error);
        return {
            success: false,
            error: 'Failed to fetch requisition'
        };
    }
}
async function createRequisition(formData) {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) return {
            success: false,
            error: 'Unauthorized'
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        // Handle file uploads (optional — implement your preferred storage)
        const files = formData.getAll('files');
        const attachmentUrls = [];
        if (files.length > 0 && files[0].size > 0) {
            // Example: upload to Cloudinary, Supabase, AWS S3, etc.
            // attachmentUrls = await uploadToCloudinary(files)
            // For now, just use placeholder or skip
            console.log(`Uploading ${files.length} file(s)...`);
        }
        // Auto-generate requisitionId if not provided
        let requisitionId = formData.get('requisitionId');
        if (!requisitionId) {
            const count = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Requisition$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Requisition"].countDocuments();
            const year = new Date().getFullYear();
            requisitionId = `REQ-${year}-${String(count + 1).padStart(4, '0')}`;
        }
        const lineItemsRaw = formData.get('lineItems');
        const lineItems = lineItemsRaw ? JSON.parse(lineItemsRaw) : [];
        const requisition = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Requisition$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Requisition"].create({
            requisitionId,
            requester: formData.get('requester'),
            createdBy: userId,
            branch: formData.get('branch'),
            date: formData.get('date') ? new Date(formData.get('date')) : new Date(),
            amount: Number(formData.get('amount')),
            category: formData.get('category'),
            neededBy: formData.get('neededBy') ? new Date(formData.get('neededBy')) : null,
            costCenter: formData.get('costCenter') || undefined,
            lineItems,
            // attachments: attachmentUrls, // Add field to schema if needed
            timeline: [
                {
                    event: 'Requisition created',
                    timestamp: new Date(),
                    actor: userId,
                    details: 'Requisition submitted for approval'
                }
            ]
        });
        // Create notification
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$notification$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createNotification"])({
            userId: 'admin-user-id-here',
            type: 'requisition_submitted',
            title: 'New Requisition Submitted',
            message: `${requisition.requester} submitted ${requisitionId} for $${requisition.amount.toLocaleString()}`,
            actionUrl: `/requisitions/${requisition._id}`,
            priority: 'high',
            metadata: {
                requisitionId,
                amount: requisition.amount
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/requisitions');
        return {
            success: true,
            data: JSON.parse(JSON.stringify(requisition))
        };
    } catch (error) {
        console.error('[createRequisition] Error:', error);
        return {
            success: false,
            error: error.message || 'Failed to create requisition'
        };
    }
}
async function updateRequisition(id, updates) {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            return {
                success: false,
                error: 'Unauthorized'
            };
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const oldRequisition = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Requisition$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Requisition"].findById(id).lean();
        const requisition = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Requisition$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Requisition"].findByIdAndUpdate(id, updates, {
            new: true
        }).lean();
        if (!requisition) {
            return {
                success: false,
                error: 'Requisition not found'
            };
        }
        const oldReq = oldRequisition;
        const req = requisition;
        if (oldReq && oldReq.status !== req.status) {
            if (req.status === 'approved') {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$notification$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createNotification"])({
                    userId: req.createdBy || 'REQUESTER_USER_ID',
                    type: 'requisition_approved',
                    title: 'Requisition Approved',
                    message: `Your requisition ${req.requisitionId ?? ''} has been approved for $${(req.amount ?? 0).toLocaleString()}`,
                    actionUrl: `/requisitions/${req._id}`,
                    priority: 'medium',
                    metadata: {
                        requisitionId: req.requisitionId ?? '',
                        amount: req.amount ?? 0
                    }
                });
            } else if (req.status === 'rejected') {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$notification$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createNotification"])({
                    userId: req.createdBy || 'REQUESTER_USER_ID',
                    type: 'requisition_rejected',
                    title: 'Requisition Rejected',
                    message: `Your requisition ${req.requisitionId ?? ''} has been rejected. Please review and resubmit.`,
                    actionUrl: `/requisitions/${req._id}`,
                    priority: 'high',
                    metadata: {
                        requisitionId: req.requisitionId ?? '',
                        amount: req.amount ?? 0
                    }
                });
            }
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/requisitions');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/requisitions/${id}`);
        return {
            success: true,
            data: JSON.parse(JSON.stringify(requisition))
        };
    } catch (error) {
        console.error('[v0] Error updating requisition:', error);
        return {
            success: false,
            error: 'Failed to update requisition'
        };
    }
}
async function deleteRequisition(id) {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            return {
                success: false,
                error: 'Unauthorized'
            };
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const requisition = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Requisition$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Requisition"].findByIdAndDelete(id);
        if (!requisition) {
            return {
                success: false,
                error: 'Requisition not found'
            };
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/requisitions');
        return {
            success: true
        };
    } catch (error) {
        console.error('[v0] Error deleting requisition:', error);
        return {
            success: false,
            error: 'Failed to delete requisition'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getRequisitions,
    getRequisitionById,
    createRequisition,
    updateRequisition,
    deleteRequisition
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRequisitions, "00f93edef6788ddd9b8af38497df494125f26e0a30", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRequisitionById, "401a5cacc8acb6d6c92973fa5e0723bde9001dd60a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createRequisition, "407fe89d5a3a72e1b4b59b95e3dfb924aeeef4e250", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateRequisition, "6088358830acefb738fbc441f7e6c85cc5ba25a4f3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteRequisition, "40756dfcbc3f56d647b028b029195cd0a90605b2e0", null);
}),
"[project]/lib/models/PurchaseOrder.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PurchaseOrder",
    ()=>PurchaseOrder
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const PurchaseOrderSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    poNumber: {
        type: String,
        required: true,
        unique: true
    },
    supplier: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [
            'Partially received',
            'Pending receipt',
            'Pending invoice',
            'Closed',
            'Delivered',
            'Shipped',
            'Issued',
            'In transit',
            'Invoiced'
        ],
        default: 'Issued'
    },
    delivery: {
        type: Date
    },
    total: {
        type: Number,
        required: true
    },
    requester: {
        type: String
    },
    department: {
        type: String
    },
    linkedRequisition: {
        type: String
    },
    currency: {
        type: String,
        default: 'USD'
    },
    purpose: {
        type: String
    },
    paymentTerms: {
        type: String
    },
    keyDates: {
        issued: Date,
        requestedDelivery: Date
    },
    lineItems: [
        {
            line: Number,
            description: String,
            ordered: Number,
            received: Number,
            remaining: Number,
            lineTotal: Number
        }
    ],
    delivery: {
        shipTo: String,
        invoiceTo: String
    },
    receiptStatus: {
        status: String,
        details: String
    },
    invoiceStatus: {
        status: String,
        details: String
    },
    approvalHistory: [
        {
            event: String,
            date: String,
            actor: String
        }
    ],
    notes: String
}, {
    timestamps: true
});
const PurchaseOrder = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].PurchaseOrder || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])('PurchaseOrder', PurchaseOrderSchema);
}),
"[project]/lib/actions/purchase-order-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"008ac700298d7018d7882f3f0498231dff889212ee":"getSpendMTD","00d4f59607aeee05444a42f71a0eb0840f42e98d72":"getPurchaseOrders","406f7d4dbe348be6b4cd3abe2d3b8b55238bf03804":"closePurchaseOrder","40926ca6dba8cdbd264844757ea7ef96ebd06d7989":"getPurchaseOrderById","40d365b849c0b700bd6fc40530ccd289c589801319":"createPurchaseOrder","60d01ec5858d99bf54edca82a3ca6890d5ed59bade":"receiveGoods"},"",""] */ __turbopack_context__.s([
    "closePurchaseOrder",
    ()=>closePurchaseOrder,
    "createPurchaseOrder",
    ()=>createPurchaseOrder,
    "getPurchaseOrderById",
    ()=>getPurchaseOrderById,
    "getPurchaseOrders",
    ()=>getPurchaseOrders,
    "getSpendMTD",
    ()=>getSpendMTD,
    "receiveGoods",
    ()=>receiveGoods
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$PurchaseOrder$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models/PurchaseOrder.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function getPurchaseOrders() {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const orders = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$PurchaseOrder$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PurchaseOrder"].find({}).sort({
            createdAt: -1
        }).limit(50).lean();
        return {
            success: true,
            data: JSON.parse(JSON.stringify(orders))
        };
    } catch (error) {
        console.error('[v0] Error fetching purchase orders:', error);
        return {
            success: false,
            error: 'Failed to fetch purchase orders'
        };
    }
}
async function getSpendMTD() {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$PurchaseOrder$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PurchaseOrder"].aggregate([
            {
                $match: {
                    'keyDates.issued': {
                        $gte: start,
                        $lt: end
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    sum: {
                        $sum: '$total'
                    }
                }
            }
        ]);
        const sum = result?.[0]?.sum || 0;
        return {
            success: true,
            data: sum
        };
    } catch (error) {
        console.error('[v0] Error aggregating MTD spend:', error);
        return {
            success: false,
            error: 'Failed to aggregate MTD spend'
        };
    }
}
async function getPurchaseOrderById(id) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const order = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$PurchaseOrder$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PurchaseOrder"].findById(id).lean();
        if (!order) {
            return {
                success: false,
                error: 'Purchase order not found'
            };
        }
        return {
            success: true,
            data: JSON.parse(JSON.stringify(order))
        };
    } catch (error) {
        console.error('[v0] Error fetching purchase order:', error);
        return {
            success: false,
            error: 'Failed to fetch purchase order'
        };
    }
}
async function receiveGoods(id, lineItems) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const order = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$PurchaseOrder$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PurchaseOrder"].findByIdAndUpdate(id, {
            $set: {
                'receiptStatus.received': lineItems
            }
        }, {
            new: true
        }).lean();
        if (!order) {
            return {
                success: false,
                error: 'Purchase order not found'
            };
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/purchase-orders');
        return {
            success: true,
            data: JSON.parse(JSON.stringify(order))
        };
    } catch (error) {
        console.error('[v0] Error receiving goods:', error);
        return {
            success: false,
            error: 'Failed to receive goods'
        };
    }
}
async function closePurchaseOrder(id) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const order = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$PurchaseOrder$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PurchaseOrder"].findByIdAndUpdate(id, {
            status: 'closed',
            closedAt: new Date()
        }, {
            new: true
        }).lean();
        if (!order) {
            return {
                success: false,
                error: 'Purchase order not found'
            };
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/purchase-orders');
        return {
            success: true,
            data: JSON.parse(JSON.stringify(order))
        };
    } catch (error) {
        console.error('[v0] Error closing purchase order:', error);
        return {
            success: false,
            error: 'Failed to close purchase order'
        };
    }
}
async function createPurchaseOrder(data) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const count = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$PurchaseOrder$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PurchaseOrder"].countDocuments();
        const poNumber = `PO-${(count + 1200).toString()}`;
        const now = new Date();
        const items = (data.lineItems || []).map((li, idx)=>{
            const ordered = Number(li.qty) || 0;
            const received = 0;
            const remaining = ordered;
            const lineTotal = (Number(li.qty) || 0) * (Number(li.unitPrice) || 0);
            return {
                line: idx + 1,
                description: li.description,
                ordered,
                received,
                remaining,
                lineTotal
            };
        });
        const total = items.reduce((sum, it)=>sum + (Number(it.lineTotal) || 0), 0);
        const po = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$PurchaseOrder$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PurchaseOrder"].create({
            poNumber,
            supplier: data.supplier,
            status: 'Issued',
            total,
            requester: data.requester,
            department: data.department,
            linkedRequisition: data.linkedRequisition,
            currency: data.currency || 'USD',
            purpose: data.purpose,
            paymentTerms: data.paymentTerms,
            keyDates: {
                issued: now,
                requestedDelivery: data.requestedDelivery || undefined
            },
            lineItems: items,
            delivery: {
                shipTo: '',
                invoiceTo: ''
            },
            receiptStatus: {
                status: 'Pending receipt',
                details: ''
            },
            invoiceStatus: {
                status: 'Pending invoice',
                details: ''
            },
            approvalHistory: [
                {
                    event: 'PO issued',
                    date: now.toISOString(),
                    actor: data.requester || ''
                }
            ],
            notes: ''
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/purchase-orders');
        return {
            success: true,
            data: JSON.parse(JSON.stringify(po))
        };
    } catch (error) {
        console.error('[v0] Error creating purchase order:', error);
        return {
            success: false,
            error: 'Failed to create purchase order'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getPurchaseOrders,
    getSpendMTD,
    getPurchaseOrderById,
    receiveGoods,
    closePurchaseOrder,
    createPurchaseOrder
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPurchaseOrders, "00d4f59607aeee05444a42f71a0eb0840f42e98d72", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSpendMTD, "008ac700298d7018d7882f3f0498231dff889212ee", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPurchaseOrderById, "40926ca6dba8cdbd264844757ea7ef96ebd06d7989", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(receiveGoods, "60d01ec5858d99bf54edca82a3ca6890d5ed59bade", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(closePurchaseOrder, "406f7d4dbe348be6b4cd3abe2d3b8b55238bf03804", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPurchaseOrder, "40d365b849c0b700bd6fc40530ccd289c589801319", null);
}),
"[project]/lib/models/Supplier.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Supplier",
    ()=>Supplier
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const SupplierSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    supplierId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    ownerUserId: {
        type: String,
        required: true,
        index: true
    },
    segment: {
        type: String
    },
    category: {
        type: String
    },
    region: {
        type: String
    },
    onboarding: {
        contactPerson: String,
        phone: String,
        email: String,
        goodsType: String,
        productCategories: [
            String
        ],
        supplyAreas: [
            String
        ],
        deliveryTimeline: String,
        priceListUploads: [
            {
                name: String,
                size: Number,
                type: String
            }
        ],
        registrationCertificateUploads: [
            {
                name: String,
                size: Number,
                type: String
            }
        ],
        businessRegistrationCertificateUploads: [
            {
                name: String,
                size: Number,
                type: String
            }
        ],
        taxClearanceCertificateUploads: [
            {
                name: String,
                size: Number,
                type: String
            }
        ],
        gstVatRegistrationCertificateUploads: [
            {
                name: String,
                size: Number,
                type: String
            }
        ],
        businessLicenseUploads: [
            {
                name: String,
                size: Number,
                type: String
            }
        ],
        nassitCertificateUploads: [
            {
                name: String,
                size: Number,
                type: String
            }
        ],
        sectorSpecificCertificateUploads: [
            {
                name: String,
                size: Number,
                type: String
            }
        ],
        paymentMethods: [
            String
        ],
        bankDetails: {
            bankName: String,
            accountName: String,
            accountNumber: String,
            prefersCash: Boolean
        },
        declarations: {
            infoAccurate: Boolean,
            agreeRules: Boolean
        }
    },
    risk: {
        type: String,
        enum: [
            'Low',
            'Medium',
            'High',
            'Under review'
        ]
    },
    onTimePerformance: {
        type: Number
    },
    fy24Spend: {
        type: Number
    },
    performanceScore: {
        type: Number
    },
    riskStatus: {
        type: String
    },
    primaryCategory: {
        type: String
    },
    commercialTerms: {
        paymentTerms: String,
        diversityStatus: String
    },
    performanceMetrics: {
        deliveryPerformance: {
            onTime: Number,
            avgLeadTime: Number,
            lateDeliveries: Number
        },
        qualityMetrics: {
            returnRate: Number,
            qualityIncidents: Number,
            criticalEvents: Number
        },
        financialMetrics: {
            externalRating: String,
            creditLimit: Number,
            overdueInvoices: Boolean,
            paymentAge: Number
        },
        complianceStatus: {
            kyc: String,
            aml: String,
            insuranceCerts: Boolean,
            sanctions: String
        }
    },
    contacts: [
        {
            role: String,
            name: String,
            email: String,
            phone: String
        }
    ],
    documents: [
        {
            name: String,
            type: String,
            size: String,
            signedDate: String,
            expiresDate: String,
            owner: String
        }
    ],
    recentActivity: [
        {
            event: String,
            date: String,
            owner: String
        }
    ]
}, {
    timestamps: true
});
const Supplier = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Supplier || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])('Supplier', SupplierSchema);
}),
"[project]/lib/actions/supplier-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00332f2a9588a8fdc5af46c84a7faabd0405f6a2e3":"getSuppliers","404db66e2cb6952be70015e2549420a2377296df76":"deleteSupplier","409acdccfd1945617533ca87d53593b6bb27e15179":"createSupplier","40de0da7ad6edc422b1506762deaf6da3bfcccf440":"getSupplierById","602cdea5b2b9d8f3972033a994a2214743035388af":"updateSupplier"},"",""] */ __turbopack_context__.s([
    "createSupplier",
    ()=>createSupplier,
    "deleteSupplier",
    ()=>deleteSupplier,
    "getSupplierById",
    ()=>getSupplierById,
    "getSuppliers",
    ()=>getSuppliers,
    "updateSupplier",
    ()=>updateSupplier
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Supplier$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models/Supplier.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function getSuppliers() {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const suppliers = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Supplier$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Supplier"].find({
            approved: true
        }).sort({
            performanceScore: -1
        }).limit(50).lean();
        return {
            success: true,
            data: JSON.parse(JSON.stringify(suppliers))
        };
    } catch (error) {
        console.error('[v0] Error fetching suppliers:', error);
        return {
            success: false,
            error: 'Failed to fetch suppliers'
        };
    }
}
async function getSupplierById(id) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const supplier = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Supplier$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Supplier"].findById(id).lean();
        if (!supplier) {
            return {
                success: false,
                error: 'Supplier not found'
            };
        }
        return {
            success: true,
            data: JSON.parse(JSON.stringify(supplier))
        };
    } catch (error) {
        console.error('[v0] Error fetching supplier:', error);
        return {
            success: false,
            error: 'Failed to fetch supplier'
        };
    }
}
async function createSupplier(data) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const supplier = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Supplier$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Supplier"].create(data);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/suppliers');
        return {
            success: true,
            data: JSON.parse(JSON.stringify(supplier))
        };
    } catch (error) {
        console.error('[v0] Error creating supplier:', error);
        return {
            success: false,
            error: 'Failed to create supplier'
        };
    }
}
async function updateSupplier(id, updates) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const supplier = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Supplier$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Supplier"].findByIdAndUpdate(id, updates, {
            new: true
        }).lean();
        if (!supplier) {
            return {
                success: false,
                error: 'Supplier not found'
            };
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/suppliers');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/suppliers/${id}`);
        return {
            success: true,
            data: JSON.parse(JSON.stringify(supplier))
        };
    } catch (error) {
        console.error('[v0] Error updating supplier:', error);
        return {
            success: false,
            error: 'Failed to update supplier'
        };
    }
}
async function deleteSupplier(id) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const supplier = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Supplier$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Supplier"].findByIdAndDelete(id);
        if (!supplier) {
            return {
                success: false,
                error: 'Supplier not found'
            };
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/suppliers');
        return {
            success: true
        };
    } catch (error) {
        console.error('[v0] Error deleting supplier:', error);
        return {
            success: false,
            error: 'Failed to delete supplier'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSuppliers, "00332f2a9588a8fdc5af46c84a7faabd0405f6a2e3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSupplierById, "40de0da7ad6edc422b1506762deaf6da3bfcccf440", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createSupplier, "409acdccfd1945617533ca87d53593b6bb27e15179", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateSupplier, "602cdea5b2b9d8f3972033a994a2214743035388af", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteSupplier, "404db66e2cb6952be70015e2549420a2377296df76", null);
}),
"[project]/lib/models/Invoice.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Invoice",
    ()=>Invoice
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const InvoiceSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    supplier: {
        type: String,
        required: true
    },
    poNumber: {
        type: String
    },
    status: {
        type: String,
        enum: [
            'Pending approval',
            'Overdue',
            'Pending match',
            'Paid',
            'Closed'
        ],
        default: 'Pending approval'
    },
    dueDate: {
        type: Date
    },
    invoiceDate: {
        type: Date
    },
    amount: {
        type: Number,
        required: true
    },
    entity: {
        type: String
    },
    currency: {
        type: String,
        default: 'USD'
    },
    matching: {
        status: String,
        poMatch: String,
        grnMatch: String,
        priceVariance: Number
    },
    approvalWorkflow: {
        owner: String,
        approvers: [
            String
        ],
        sla: Number
    },
    coding: {
        costCenter: String,
        gl: String,
        officeSupplies: String,
        taxCode: String
    },
    lineItems: [
        {
            description: String,
            qty: Number,
            unitPrice: Number,
            tax: Number,
            lineTotal: Number
        }
    ],
    activity: [
        {
            event: String,
            date: Date,
            details: String
        }
    ],
    notes: String
}, {
    timestamps: true
});
const Invoice = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Invoice || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])('Invoice', InvoiceSchema);
}),
"[project]/lib/actions/invoice-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"009eaa938e05d48f7d0f7e02001ceefd7e0bee7082":"getInvoices","00f578ef6a99852655373bf0ead7f61159c54a74ff":"checkOverdueInvoices","40c90700c4dc2c59c2a64f69370f6d39bdc6f0839d":"getInvoiceById","607caba07c67b30f70f98fe33d670d9fb2a3bd7ea6":"schedulePayment","608c4a7d4518cd52933ef901f1e2e204f58b86a0be":"putInvoiceOnHold"},"",""] */ __turbopack_context__.s([
    "checkOverdueInvoices",
    ()=>checkOverdueInvoices,
    "getInvoiceById",
    ()=>getInvoiceById,
    "getInvoices",
    ()=>getInvoices,
    "putInvoiceOnHold",
    ()=>putInvoiceOnHold,
    "schedulePayment",
    ()=>schedulePayment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Invoice$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models/Invoice.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$notification$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions/notification-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function getInvoices() {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const invoices = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Invoice$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Invoice"].find({}).sort({
            createdAt: -1
        }).limit(50).lean();
        return {
            success: true,
            data: JSON.parse(JSON.stringify(invoices))
        };
    } catch (error) {
        console.error('[v0] Error fetching invoices:', error);
        return {
            success: false,
            error: 'Failed to fetch invoices'
        };
    }
}
async function getInvoiceById(id) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const invoice = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Invoice$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Invoice"].findById(id).lean();
        if (!invoice) {
            return {
                success: false,
                error: 'Invoice not found'
            };
        }
        return {
            success: true,
            data: JSON.parse(JSON.stringify(invoice))
        };
    } catch (error) {
        console.error('[v0] Error fetching invoice:', error);
        return {
            success: false,
            error: 'Failed to fetch invoice'
        };
    }
}
async function schedulePayment(id, paymentDate) {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            return {
                success: false,
                error: 'Unauthorized'
            };
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const invoice = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Invoice$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Invoice"].findByIdAndUpdate(id, {
            status: 'scheduled',
            scheduledPaymentDate: paymentDate,
            scheduledBy: userId
        }, {
            new: true
        }).lean();
        if (!invoice) {
            return {
                success: false,
                error: 'Invoice not found'
            };
        }
        const inv = invoice;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$notification$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createNotification"])({
            userId: 'FINANCE_USER_ID',
            type: 'invoice_overdue',
            title: 'Payment Scheduled',
            message: `Invoice ${String(inv.invoiceNumber || '')} payment scheduled for ${new Date(paymentDate).toLocaleDateString()}`,
            actionUrl: `/invoices/${String(inv._id)}`,
            priority: 'low',
            metadata: {
                invoiceNumber: inv.invoiceNumber || '',
                amount: inv.amount ?? 0,
                paymentDate: paymentDate
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/invoices');
        return {
            success: true,
            data: JSON.parse(JSON.stringify(invoice))
        };
    } catch (error) {
        console.error('Error scheduling payment:', error);
        return {
            success: false,
            error: 'Failed to schedule payment'
        };
    }
}
async function putInvoiceOnHold(id, reason) {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            return {
                success: false,
                error: 'Unauthorized'
            };
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const invoice = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Invoice$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Invoice"].findByIdAndUpdate(id, {
            status: 'on_hold',
            holdReason: reason,
            putOnHoldBy: userId
        }, {
            new: true
        }).lean();
        if (!invoice) {
            return {
                success: false,
                error: 'Invoice not found'
            };
        }
        const inv2 = invoice;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$notification$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createNotification"])({
            userId: 'PROCUREMENT_USER_ID',
            type: 'invoice_overdue',
            title: 'Invoice Put On Hold',
            message: `Invoice ${String(inv2.invoiceNumber || '')} has been put on hold. Reason: ${reason}`,
            actionUrl: `/invoices/${String(inv2._id)}`,
            priority: 'high',
            metadata: {
                invoiceNumber: inv2.invoiceNumber || '',
                amount: inv2.amount ?? 0,
                holdReason: reason
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/invoices');
        return {
            success: true,
            data: JSON.parse(JSON.stringify(invoice))
        };
    } catch (error) {
        console.error('[v0] Error putting invoice on hold:', error);
        return {
            success: false,
            error: 'Failed to put invoice on hold'
        };
    }
}
async function checkOverdueInvoices() {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            return {
                success: false,
                error: 'Unauthorized'
            };
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const today = new Date();
        const overdueInvoices = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Invoice$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Invoice"].find({
            status: {
                $in: [
                    'pending_approval',
                    'pending_match'
                ]
            },
            dueDate: {
                $lt: today
            }
        }).lean();
        for (const invoice of overdueInvoices){
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$notification$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createNotification"])({
                userId: 'FINANCE_USER_ID',
                type: 'invoice_overdue',
                title: 'Invoice Overdue',
                message: `Invoice ${invoice.invoiceNumber} from ${invoice.supplier} is overdue by ${Math.floor((today.getTime() - new Date(invoice.dueDate).getTime()) / (1000 * 60 * 60 * 24))} days`,
                actionUrl: `/invoices/${invoice._id}`,
                priority: 'urgent',
                metadata: {
                    invoiceNumber: invoice.invoiceNumber,
                    supplier: invoice.supplier,
                    amount: invoice.amount,
                    dueDate: invoice.dueDate
                }
            });
        }
        return {
            success: true,
            count: overdueInvoices.length
        };
    } catch (error) {
        console.error('[v0] Error checking overdue invoices:', error);
        return {
            success: false,
            error: 'Failed to check overdue invoices'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getInvoices,
    getInvoiceById,
    schedulePayment,
    putInvoiceOnHold,
    checkOverdueInvoices
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getInvoices, "009eaa938e05d48f7d0f7e02001ceefd7e0bee7082", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getInvoiceById, "40c90700c4dc2c59c2a64f69370f6d39bdc6f0839d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(schedulePayment, "607caba07c67b30f70f98fe33d670d9fb2a3bd7ea6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(putInvoiceOnHold, "608c4a7d4518cd52933ef901f1e2e204f58b86a0be", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkOverdueInvoices, "00f578ef6a99852655373bf0ead7f61159c54a74ff", null);
}),
"[project]/lib/models/Approval.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Approval",
    ()=>Approval
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const ApprovalSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    approvalId: {
        type: String,
        required: true,
        unique: true
    },
    itemId: {
        type: String
    },
    type: {
        type: String,
        enum: [
            'Requisition',
            'Purchase Order'
        ],
        required: true
    },
    requester: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date
    },
    status: {
        type: String,
        enum: [
            'Awaiting your approval',
            'Pending review',
            'Parallel approval',
            'SLA breached',
            'approved',
            'rejected',
            'changes_requested'
        ],
        default: 'Awaiting your approval'
    },
    priority: {
        type: String,
        enum: [
            'High',
            'Medium',
            'Low',
            'Critical'
        ]
    },
    amount: {
        type: Number,
        required: true
    },
    costCenter: {
        type: String
    },
    branch: {
        type: String
    },
    approvedAt: {
        type: Date
    },
    approvedBy: {
        type: String
    },
    rejectedAt: {
        type: Date
    },
    rejectedBy: {
        type: String
    },
    requestedBy: {
        type: String
    },
    decisionContext: {
        totalAmount: Number,
        budgetImpact: Number,
        riskPolicy: String,
        sla: String,
        category: String,
        neededBy: Date,
        supplierPreference: String,
        approvalRoute: String
    },
    reason: {
        type: String
    },
    summary: {
        items: [
            {
                description: String,
                qty: Number,
                unit: String,
                unitCost: Number,
                total: Number
            }
        ]
    },
    timeline: [
        {
            event: String,
            timestamp: Date,
            actor: String,
            details: String
        }
    ],
    comments: [
        {
            author: String,
            text: String,
            date: Date
        }
    ]
}, {
    timestamps: true
});
const Approval = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Approval || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])('Approval', ApprovalSchema);
}),
"[project]/lib/actions/approval-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00b87657f50f0ce9bce82c20f2d9c5c2f4d9f28b19":"getApprovals","40df5ed11e033897f6c618e0748bc4a47c24492ba8":"getApprovalById","6014d8635dff7afed7da14ad73aec232ed74390041":"approveRequest","601dea283a5ba8072f6b619b9027b8760d63d2d143":"bulkApprove","60931729ff5dd613f95ee9c7fd936c4e68eceaec2d":"rejectRequest","60ebd8797bde177fe14f1bb65e0db28bfb23123b40":"requestChanges"},"",""] */ __turbopack_context__.s([
    "approveRequest",
    ()=>approveRequest,
    "bulkApprove",
    ()=>bulkApprove,
    "getApprovalById",
    ()=>getApprovalById,
    "getApprovals",
    ()=>getApprovals,
    "rejectRequest",
    ()=>rejectRequest,
    "requestChanges",
    ()=>requestChanges
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$notification$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions/notification-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Approval$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models/Approval.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function getApprovals() {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const approvals = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Approval$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Approval"].find({}).sort({
            createdAt: -1
        }).limit(50).lean();
        return {
            success: true,
            data: JSON.parse(JSON.stringify(approvals))
        };
    } catch (error) {
        console.error('[v0] Error fetching approvals:', error);
        return {
            success: false,
            error: 'Failed to fetch approvals'
        };
    }
}
async function getApprovalById(id) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const approval = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Approval$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Approval"].findById(id).lean();
        if (!approval) {
            return {
                success: false,
                error: 'Approval not found'
            };
        }
        return {
            success: true,
            data: JSON.parse(JSON.stringify(approval))
        };
    } catch (error) {
        console.error('[v0] Error fetching approval:', error);
        return {
            success: false,
            error: 'Failed to fetch approval'
        };
    }
}
async function approveRequest(id, comments) {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            return {
                success: false,
                error: 'Unauthorized'
            };
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Approval$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Approval"].findByIdAndUpdate(id, {
            status: 'approved',
            approvedAt: new Date(),
            approvedBy: userId
        }, {
            new: true
        });
        let approval = updated?.toObject();
        if (comments && updated) {
            approval = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Approval$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Approval"].findByIdAndUpdate(id, {
                $push: {
                    comments: {
                        author: userId,
                        text: comments,
                        date: new Date()
                    }
                }
            }, {
                new: true
            }).lean();
        } else {
            approval = approval;
        }
        if (!approval) {
            return {
                success: false,
                error: 'Approval not found'
            };
        }
        const ap = approval;
        const resourceType = ap.type ? ap.type.toLowerCase() : 'request';
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$notification$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createNotification"])({
            userId: 'REQUESTER_USER_ID',
            type: 'approval_pending',
            title: `${resourceType} Approved`,
            message: `Your ${resourceType} ${ap.itemId ?? ''} for $${(ap.amount ?? 0).toLocaleString()} has been approved`,
            actionUrl: `/${resourceType}s/${ap.itemId ?? ''}`,
            priority: 'medium',
            metadata: {
                approvalId: ap._id,
                itemId: ap.itemId ?? '',
                amount: ap.amount ?? 0
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/approvals');
        return {
            success: true,
            data: JSON.parse(JSON.stringify(approval))
        };
    } catch (error) {
        console.error('[v0] Error approving request:', error);
        return {
            success: false,
            error: 'Failed to approve request'
        };
    }
}
async function rejectRequest(id, comments) {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            return {
                success: false,
                error: 'Unauthorized'
            };
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Approval$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Approval"].findByIdAndUpdate(id, {
            status: 'rejected',
            rejectedAt: new Date(),
            rejectedBy: userId
        }, {
            new: true
        });
        const approval = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Approval$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Approval"].findByIdAndUpdate(id, {
            $push: {
                comments: {
                    author: userId,
                    text: comments,
                    date: new Date()
                }
            }
        }, {
            new: true
        }).lean();
        if (!approval) {
            return {
                success: false,
                error: 'Approval not found'
            };
        }
        {
            const ap = approval;
            const resourceType = ap.type ? ap.type.toLowerCase() : 'request';
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$notification$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createNotification"])({
                userId: 'REQUESTER_USER_ID',
                type: 'approval_pending',
                title: `${ap.type ?? 'Request'} Rejected`,
                message: `Your ${resourceType} ${ap.itemId ?? ''} has been rejected. ${comments}`,
                actionUrl: `/${resourceType}s/${ap.itemId ?? ''}`,
                priority: 'high',
                metadata: {
                    approvalId: ap._id,
                    itemId: ap.itemId ?? '',
                    amount: ap.amount ?? 0,
                    rejectionReason: comments
                }
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/approvals');
        return {
            success: true,
            data: JSON.parse(JSON.stringify(approval))
        };
    } catch (error) {
        console.error('[v0] Error rejecting request:', error);
        return {
            success: false,
            error: 'Failed to reject request'
        };
    }
}
async function requestChanges(id, comments) {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            return {
                success: false,
                error: 'Unauthorized'
            };
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Approval$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Approval"].findByIdAndUpdate(id, {
            status: 'changes_requested',
            requestedBy: userId
        }, {
            new: true
        });
        const approval = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Approval$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Approval"].findByIdAndUpdate(id, {
            $push: {
                comments: {
                    author: userId,
                    text: comments,
                    date: new Date()
                }
            }
        }, {
            new: true
        }).lean();
        if (!approval) {
            return {
                success: false,
                error: 'Approval not found'
            };
        }
        {
            const ap = approval;
            const resourceType = ap.type ? ap.type.toLowerCase() : 'request';
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2f$notification$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createNotification"])({
                userId: 'REQUESTER_USER_ID',
                type: 'approval_pending',
                title: 'Changes Requested',
                message: `Changes requested for ${resourceType} ${ap.itemId ?? ''}. ${comments}`,
                actionUrl: `/${resourceType}s/${ap.itemId ?? ''}`,
                priority: 'medium',
                metadata: {
                    approvalId: ap._id,
                    itemId: ap.itemId ?? '',
                    changeComments: comments
                }
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/approvals');
        return {
            success: true,
            data: JSON.parse(JSON.stringify(approval))
        };
    } catch (error) {
        console.error('[v0] Error requesting changes:', error);
        return {
            success: false,
            error: 'Failed to request changes'
        };
    }
}
async function bulkApprove(ids, comments) {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            return {
                success: false,
                error: 'Unauthorized'
            };
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const now = new Date();
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Approval$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Approval"].updateMany({
            _id: {
                $in: ids
            }
        }, {
            $set: {
                status: 'approved',
                approvedAt: now,
                approvedBy: userId
            }
        });
        if (comments) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Approval$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Approval"].updateMany({
                _id: {
                    $in: ids
                }
            }, {
                $push: {
                    comments: {
                        author: userId,
                        text: comments,
                        date: now
                    }
                }
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/approvals');
        return {
            success: true,
            count: ids.length
        };
    } catch (error) {
        console.error('[v0] Error bulk approving:', error);
        return {
            success: false,
            error: 'Failed to bulk approve'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getApprovals,
    getApprovalById,
    approveRequest,
    rejectRequest,
    requestChanges,
    bulkApprove
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getApprovals, "00b87657f50f0ce9bce82c20f2d9c5c2f4d9f28b19", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getApprovalById, "40df5ed11e033897f6c618e0748bc4a47c24492ba8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(approveRequest, "6014d8635dff7afed7da14ad73aec232ed74390041", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(rejectRequest, "60931729ff5dd613f95ee9c7fd936c4e68eceaec2d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(requestChanges, "60ebd8797bde177fe14f1bb65e0db28bfb23123b40", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(bulkApprove, "601dea283a5ba8072f6b619b9027b8760d63d2d143", null);
}),
"[project]/lib/models/Tender.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tender",
    ()=>Tender
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const TenderSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    tenderId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: [
            'RFP',
            'RFQ',
            'RFI'
        ],
        required: true
    },
    stage: {
        type: String,
        enum: [
            'Evaluation',
            'Open',
            'Planned',
            'Awarded',
            'Closed'
        ]
    },
    closeDate: {
        type: Date
    },
    responses: {
        type: Number,
        default: 0
    },
    owner: {
        type: String
    },
    category: {
        type: String
    },
    businessUnit: {
        type: String
    },
    region: {
        type: String
    },
    sourcingObjective: {
        type: String
    },
    estimatedValue: {
        type: Number
    },
    contractTerm: {
        type: String
    },
    sourcingType: {
        type: String
    },
    invitedSuppliers: {
        type: Number
    },
    keyDates: {
        published: Date,
        closed: Date
    },
    evaluationSummary: {
        recommendedSupplier: String,
        score: Number,
        totalBids: Number,
        disqualified: Number
    },
    bids: [
        {
            supplier: String,
            totalPrice: Number,
            score: Number,
            compliance: String,
            highlights: String
        }
    ],
    timeline: [
        {
            event: String,
            date: String,
            owner: String
        }
    ],
    notes: String
}, {
    timestamps: true
});
const Tender = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Tender || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])('Tender', TenderSchema);
}),
"[project]/lib/actions/tender-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00d31d1ccc0b3c052a86488fa58a130d2f96ce8c3a":"getTenders","4010b5d78bb0dba6dc192fd5fd90c317c0070c5601":"getTenderById","403ff369108e49ee3ff886c36c0d25878cfbfa33a0":"requestRevisedBids","409728999fbf9c924e9a1ffbd691eeac56920a90bf":"createTender","60e223658425b0d7487a997f4ca8c5742a4806614c":"awardTender"},"",""] */ __turbopack_context__.s([
    "awardTender",
    ()=>awardTender,
    "createTender",
    ()=>createTender,
    "getTenderById",
    ()=>getTenderById,
    "getTenders",
    ()=>getTenders,
    "requestRevisedBids",
    ()=>requestRevisedBids
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Tender$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models/Tender.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function getTenders() {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const tenders = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Tender$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Tender"].find({}).sort({
            createdAt: -1
        }).limit(50).lean();
        return {
            success: true,
            data: JSON.parse(JSON.stringify(tenders))
        };
    } catch (error) {
        console.error('[v0] Error fetching tenders:', error);
        return {
            success: false,
            error: 'Failed to fetch tenders'
        };
    }
}
async function getTenderById(id) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const tender = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Tender$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Tender"].findById(id).lean();
        if (!tender) {
            return {
                success: false,
                error: 'Tender not found'
            };
        }
        return {
            success: true,
            data: JSON.parse(JSON.stringify(tender))
        };
    } catch (error) {
        console.error('[v0] Error fetching tender:', error);
        return {
            success: false,
            error: 'Failed to fetch tender'
        };
    }
}
async function awardTender(id, supplierId) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const now = new Date();
        const tender = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Tender$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Tender"].findByIdAndUpdate(id, {
            stage: 'Awarded',
            keyDates: {
                closed: now
            },
            evaluationSummary: {
                recommendedSupplier: supplierId
            },
            status: 'awarded'
        }, {
            new: true
        }).lean();
        if (!tender) {
            return {
                success: false,
                error: 'Tender not found'
            };
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/tenders');
        return {
            success: true,
            data: JSON.parse(JSON.stringify(tender))
        };
    } catch (error) {
        console.error('[v0] Error awarding tender:', error);
        return {
            success: false,
            error: 'Failed to award tender'
        };
    }
}
async function requestRevisedBids(id) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        const tender = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Tender$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Tender"].findByIdAndUpdate(id, {
            status: 'revision_requested'
        }, {
            new: true
        }).lean();
        if (!tender) {
            return {
                success: false,
                error: 'Tender not found'
            };
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/tenders');
        return {
            success: true,
            data: JSON.parse(JSON.stringify(tender))
        };
    } catch (error) {
        console.error('[v0] Error requesting revised bids:', error);
        return {
            success: false,
            error: 'Failed to request revised bids'
        };
    }
}
async function createTender(data) {
    try {
        const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!userId) {
            return {
                success: false,
                error: 'Unauthorized'
            };
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        // Generate tender ID
        const count = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Tender$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Tender"].countDocuments();
        const tenderId = `RFP-${(count + 2300).toString()}`;
        const tender = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2f$Tender$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Tender"].create({
            tenderId,
            title: data.title,
            type: data.type,
            category: data.category,
            businessUnit: data.businessUnit,
            region: data.region,
            sourcingObjective: data.sourcingObjective,
            estimatedValue: data.estimatedValue,
            contractTerm: data.contractTerm,
            sourcingType: data.sourcingType,
            invitedSuppliers: data.invitedSuppliers,
            closeDate: data.closeDate,
            stage: 'Planned',
            responses: 0,
            owner: userId,
            keyDates: {
                published: new Date()
            },
            timeline: [
                {
                    event: 'Tender created',
                    date: new Date().toISOString(),
                    owner: userId
                }
            ]
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/tenders');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        return {
            success: true,
            data: JSON.parse(JSON.stringify(tender))
        };
    } catch (error) {
        console.error('[v0] Error creating tender:', error);
        return {
            success: false,
            error: 'Failed to create tender'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getTenders,
    getTenderById,
    awardTender,
    requestRevisedBids,
    createTender
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTenders, "00d31d1ccc0b3c052a86488fa58a130d2f96ce8c3a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTenderById, "4010b5d78bb0dba6dc192fd5fd90c317c0070c5601", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(awardTender, "60e223658425b0d7487a997f4ca8c5742a4806614c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(requestRevisedBids, "403ff369108e49ee3ff886c36c0d25878cfbfa33a0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTender, "409728999fbf9c924e9a1ffbd691eeac56920a90bf", null);
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ee71256b._.js.map