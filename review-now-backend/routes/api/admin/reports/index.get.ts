import { defineEventHandler } from 'h3';
import { connectDB } from '~/utils/db';

export default defineEventHandler(async (event) => {
  await connectDB();

  const ReportModel = await import('~/models/Report');
  const reports = await ReportModel.find()
    .sort({ createdAt: -1 })
    .lean();

  return reports.map(report => ({
    id: report._id.toString(),
    shopId: report.shopId.toString(),
    userId: report.userId,
    userName: report.userName,
    reason: report.reason,
    content: report.content,
    evidence: report.evidence || [],
    status: report.status,
    createdAt: report.createdAt
  }));
});
