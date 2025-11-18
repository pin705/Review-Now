import { defineEventHandler, readBody, getRouterParam } from 'h3';
import { connectDB } from '../../../../utils/db';
import { Report } from '../../../../models/Report';

export default defineEventHandler(async (event) => {
  await connectDB();

  const reportId = getRouterParam(event, 'reportId');
  const body = await readBody(event);
  const { status } = body;

  if (!reportId || !status) {
    throw new Error('Missing required fields');
  }

  const report = await Report.findByIdAndUpdate(
    reportId,
    { status },
    { new: true }
  );

  if (!report) {
    throw new Error('Report not found');
  }

  return {
    id: report._id.toString(),
    status: report.status
  };
});
