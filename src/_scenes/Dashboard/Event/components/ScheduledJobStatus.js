// @flow
import { cssConstants } from '_constants';
import { colorForStatus } from '_constants/status.constants';
import React from 'react';
import { Flex, P1, DotIcon } from '_components';
import type { EDScheduledJob } from '_models';
import { readableDate } from '_helpers/string-utils';

const Container = Flex.extend`
  padding: 0 0 6px 0;
`;

const ScheduledJobStatusNotice = P1.extend`
  font-size: 12px;
  font-weight: 600;
  height: 13px;
  margin: 0px 0px;
`;

export const ScheduledJobStatus = ({
  past,
  scheduledJob
}: {
  past: Boolean,
  scheduledJob: EDScheduledJob
}) => {
  if (past || !scheduledJob) {
    return null;
  }
  const { status, modifiedAt } = scheduledJob;

  const map = {
    Pending: {
      status: 'warn',
      title: 'Pending'
    },
    Success: {
      status: 'success',
      title: 'Success'
    },
    Failure: {
      status: 'error',
      title: 'Notice'
    },
    Running: {
      status: 'info',
      title: 'Running'
    }
  };

  const args = map[status];
  const color = past
    ? cssConstants.PRIMARY_DARKEST_GRAY
    : colorForStatus(args.status);

  return (
    <Container align="center">
      <DotIcon width={13} height={12} fill={color} />
      <ScheduledJobStatusNotice color={color}>
        {args.title} on {readableDate(modifiedAt)}
      </ScheduledJobStatusNotice>
    </Container>
  );
};
