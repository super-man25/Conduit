// @flow
import { get } from '_helpers/api';
import { EDReportPayload } from '_models';
function downloadReport(payload: EDReportPayload): Promise<Blob> {
  const { id, type, ...body } = payload;
  return get(`transactionReport/${type}/${id}`, body);
}

export const transactionReportService = {
  downloadReport,
};
