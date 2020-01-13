// @flow

export type EDScheduledJob = {
  id: number,
  eventId: number,
  jobConfigId: number,
  status: string,
  priority: number,
  startTime: Date,
  endTime: Date,
  error?: string,
  createdAt: Date,
  modifiedAt: Date,
};
