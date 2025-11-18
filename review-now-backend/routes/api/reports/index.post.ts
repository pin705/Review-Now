import { defineEventHandler, readBody } from 'h3';
import { connectDB } from '../../../utils/db';
import { Report } from '../../../models/Report';

export default defineEventHandler(async (event) => {
  await connectDB();

  const body = await readBody(event);
  const { shopId, userId, userName, reason, content, evidence } = body;

  const newReport = await Report.create({
    shopId,
    userId,
    userName,
    reason,
    content,
    evidence: evidence || [],
    status: 'pending'
  });

  return {
    id: newReport._id.toString(),
    shopId: newReport.shopId.toString(),
    userId: newReport.userId,
    userName: newReport.userName,
    reason: newReport.reason,
    content: newReport.content,
    evidence: newReport.evidence,
    createdAt: newReport.createdAt,
    status: newReport.status
  };
});
