import mongoose, { Schema, Document, Types } from "mongoose";
import { AuditAction } from "../../../constants/audit-action.js";
import { AuditTargetType } from "../../../constants/audit-target-type.js";

export interface IAuditLog extends Document {
  actor: Types.ObjectId | null; // người thực hiện
  action: AuditAction;

  targetType?: string; // USER / PRODUCT / ORDER...
  targetId?: Types.ObjectId | null;

  description: string;

  ipAddress?: string;
  userAgent?: string;

  metadata?: Record<string, any>;

  createdAt: Date;
  updatedAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    actor: {
      type: Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },

    action: {
      type: String,
      enum: Object.values(AuditAction),
      required: true,
    },

    targetType: {
      type: String,
      enum: Object.values(AuditTargetType),
      required: true,
    },

    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    ipAddress: {
        type: String,
        required: true,
    },

    userAgent: String,

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

auditLogSchema.index({ actor: 1 });
auditLogSchema.index({ action: 1 });
auditLogSchema.index({ targetId: 1 });
auditLogSchema.index({ createdAt: -1 });

export const AuditLog = mongoose.model<IAuditLog>(
  "AuditLog",
  auditLogSchema
);