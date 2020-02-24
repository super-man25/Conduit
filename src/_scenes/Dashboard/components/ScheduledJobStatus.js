// @flow
import React from 'react';
import styled from 'styled-components';
import { cssConstants } from '_constants';
import { colorForStatus } from '_constants/status.constants';
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

  const map = {
    Pending: {
      status: 'warn',
      title: 'Pending',
    },
    Success: {
      status: 'success',
      title: 'Success',
    },
    Failure: {
      status: 'error',
      title: 'Notice',
    },
    Running: {
      status: 'info',
      title: 'Running',
    },
  };

  const args = map[status];
  const color = past
    ? cssConstants.PRIMARY_DARKEST_GRAY
    : colorForStatus(args.status);

  return (
    <ScheduledJobStatusNotice color={color}>
      Price updated {readableDuration(modifiedAt)} ago
    </ScheduledJobStatusNotice>
  );
};
