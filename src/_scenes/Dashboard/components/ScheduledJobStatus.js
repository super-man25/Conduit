// @flow
import React from 'react';
import styled from 'styled-components';

import { cssConstants } from '_constants';
import { P1 } from '_components';
import type { EDScheduledJob } from '_models';
import { readableDuration } from '_helpers/string-utils';

const ScheduledJobStatusNotice = styled(P1)`
  font-size: 12px;
  position: relative;
  font-weight: 600;
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
    ? cssConstants.PRIMARY_DARKEST_GRAY
    : status === 'Pending'
    ? cssConstants.SECONDARY_BURNT_ORANGE
    : status === 'Success'
    ? cssConstants.SECONDARY_GREEN
    : status === 'Failure'
    ? cssConstants.SECONDARY_PURPLE
    : status === 'Running'
    ? cssConstants.SECONDARY_BLUE
    : cssConstants.PRIMARY_DARKEST_GRAY;

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
