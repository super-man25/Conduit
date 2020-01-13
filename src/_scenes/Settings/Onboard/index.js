// @flow
import React from 'react';
import { connect } from 'react-redux';

import { actions as onboardActions } from '_state/onboard';
import {
  PageWrapper,
  PrimaryContent,
  Breadcrumbs,
  Spacing,
  H3,
  PrimaryButton,
  Loader,
  Form,
} from '_components';
import { cssConstants } from '_constants';
import { OnboardWrapper } from './components/styled';
import { TeamInfoSection } from './components/TeamInfoSection';
import { VenueInfoSection } from './components/VenueInfoSection';
import { ApiCredentialsSection } from './components/ApiCredentialsSection';
import { SkyBoxCustomersSection } from './components/SkyBoxCustomersSection';

const onboardCrumb = [
  {
    title: 'Dashboard',
    path: '/dashboard',
  },
  {
    title: 'Onboard',
    path: '/settings/onboard',
  },
];

const formValues = {
  team: '',
  league: {
    label: '',
    value: '',
  },
  seasonName: '',
  seasonEnd: '',
  seasonStart: '',
  logoUrl: '',
  stadiumName: '',
  stadiumZip: '',
  stadiumCapacity: '',
  stadiumTimezone: {
    label: '',
    value: '',
  },
  stadiumMapUrl: '',
  accountId: '',
  apiKey: '',
  defaultVendorId: '',
  skyBoxCustomers: [
    {
      skyBoxCustomer: '',
      mapsTo: {
        label: '',
        value: '',
      },
    },
  ],
};

export const Onboard = ({
  onboardClient,
  inProgress,
  auth,
}: {
  onboardClient: any,
  inProgress: boolean,
  auth: any,
}) => {
  const handleFormSubmit = (values, actions) => {
    const clientIntegrations = {};
    values.skyBoxCustomers
      .filter(({ mapsTo }) => mapsTo.value !== 'ignored')
      .forEach((value) => {
        clientIntegrations[value.skyBoxCustomer] = value.mapsTo.value;
      });
    const customersToIgnore = values.skyBoxCustomers
      .filter(({ mapsTo }) => mapsTo.value === 'ignored')
      .map(({ skyBoxCustomer }) => skyBoxCustomer);

    onboardClient({
      teamName: values.team,
      seasonName: values.seasonName,
      seasonStart: values.seasonStart,
      seasonEnd: values.seasonEnd,
      league: values.league.value,
      logoUrl: values.logoUrl,
      venueName: values.stadiumName,
      zip: values.stadiumZip,
      timezone: values.stadiumTimezone.value,
      capacity: parseInt(values.stadiumCapacity),
      mapUrl: values.stadiumMapUrl,
      accountId: parseInt(values.accountId),
      apiKey: values.apiKey,
      defaultVendorId: parseInt(values.defaultVendorId),
      integrations: clientIntegrations,
      customersToIgnore,
      userId: auth.id,
    });
  };

  return (
    <PageWrapper>
      <PrimaryContent padding="2rem">
        <OnboardWrapper>
          <Spacing margin="2rem 0">
            <Breadcrumbs crumbs={onboardCrumb} />
          </Spacing>
          <H3 type="secondary" size="28px" weight="heavy">
            Onboard New Client
          </H3>
          <Form initialValues={formValues} handleSubmit={handleFormSubmit}>
            {({ values }) => (
              <>
                <TeamInfoSection values={values} />
                <VenueInfoSection />
                <ApiCredentialsSection />
                <SkyBoxCustomersSection values={values} />
                <PrimaryButton type="submit">
                  {inProgress ? (
                    <Loader small color={cssConstants.PRIMARY_WHITE} />
                  ) : (
                    'Onboard'
                  )}
                </PrimaryButton>
              </>
            )}
          </Form>
        </OnboardWrapper>
      </PrimaryContent>
    </PageWrapper>
  );
};

const mapStateToProps = ({ onboard, auth }) => ({
  inProgress: onboard.loading,
  auth: auth.model,
});

const mapDispatchToProps = {
  onboardClient: onboardActions.onboardClient,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Onboard);
