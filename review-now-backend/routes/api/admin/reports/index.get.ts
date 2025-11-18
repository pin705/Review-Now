import { defineEventHandler } from 'h3';
import { connectDB } from '~/utils/db';
import { Report } from '../../../../models/Report';

export default defineEventHandler(async (event) => {
  await connectDB();

  const reports = await Report.find()
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
