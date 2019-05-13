// @flow
import { get } from '_helpers/api';
import { EDReportPayload } from '_models';
function downloadReport(payload: EDReportPayload): Promise<Blob> {
  const { id, ...body } = payload;
  return get(`transactionReport/season/${id}`, body);
}

export const transactionReportService = {
  downloadReport
};
