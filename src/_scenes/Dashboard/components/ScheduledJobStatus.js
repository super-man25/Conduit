// @flow
import React from 'react';
import styled from 'styled-components';

import { colors } from '_constants';
import type { EDScheduledJob } from '_models';
import { readableDuration } from '_helpers/string-utils';

const ScheduledJobStatusNotice = styled.div`
  font-size: 12px;
  position: relative;
  margin-left: 10px;
  margin-top: 5px;
  padding-left: 5px;

  &:before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 5px;
    position: absolute;
    right: 100%;
    top: 1px; /* vertically centers visually */
    background-color: ${({ color }) => color};
  }
`;

export const ScheduledJobStatus = ({
  past,
  scheduledJob,
  timeZone,
}: {
  past: Boolean,
  scheduledJob: EDScheduledJob,
  timeZone: string,
}) => {
  if (past || !scheduledJob) {
    return null;
  }
  const { status, modifiedAt } = scheduledJob;

  const statusColor = past
    ? colors.gray
    : status === 'Pending'
    ? colors.orange
    : status === 'Success'
    ? colors.green
    : status === 'Failure'
    ? colors.purple
    : status === 'Running'
    ? colors.neonBlue
    : colors.gray;

  const statusText =
    status === 'Pending'
      ? `Price update scheduled ${readableDuration(modifiedAt)} ago`
      : status === 'Success'
      ? `Price updated ${readableDuration(modifiedAt)} ago`
      : status === 'Failure'
      ? `Price update ran ${readableDuration(modifiedAt)} ago`
      : status === 'Running'
      ? `Price update started ${readableDuration(modifiedAt)} ago`
      : '';

  return (
    <ScheduledJobStatusNotice color={statusColor}>
      {statusText}
    </ScheduledJobStatusNotice>
  );
};
