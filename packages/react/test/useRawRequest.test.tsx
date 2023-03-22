import '@testing-library/jest-dom';
import { gql } from 'graphql-request';
import React from 'react';
import { useRawRequest } from '../src/hooks';
import { APP_ID, render, screen, waitFor } from './utilities';

describe('useRawRequest', () => {
  it('allows you to make a custom request', async () => {
    render(<Test />);

    await waitFor(() => screen.getByTestId('tokenId'));

    expect(screen.getByTestId('tokenId')).toHaveTextContent(/0x/);
  });

  it('allows you to pass variables to a query', async () => {
    render(<TestVariables />);

    await waitFor(() => screen.getByTestId('tokenId'));

    expect(screen.getByTestId('tokenId')).toHaveTextContent(
      APP_ID.toLowerCase()
    );
  });

  it('allows you to pass variables and config to a query', async () => {
    render(<TestConfig />);

    await waitFor(() => {
      screen.getByTestId('tokenId');
      screen.getByTestId('success');
    });

    expect(screen.getByTestId('tokenId')).toHaveTextContent(/0x/);
    expect(screen.getByTestId('success')).toBeVisible();
  });
});

function TestConfig() {
  const [showSuccess, setShowSuccess] = React.useState(false);
  const { data } = useRawRequest<any, any, any>({
    query: gql`
      {
        apps {
          id
        }
      }
    `,
    config: {
      onSuccess: () => setShowSuccess(true),
    },
  });

  return (
    <>
      {data && <span data-testid="tokenId">{data?.apps?.[0]?.id}</span>}
      {showSuccess && <span data-testid="success">Success!</span>}
    </>
  );
}

function TestVariables() {
  const { data } = useRawRequest<any, any, any>({
    query: gql`
      query getAppById($id: String!) {
        app(id: $id) {
          id
        }
      }
    `,
    variables: {
      id: APP_ID.toLowerCase(),
    },
  });

  return <>{data && <span data-testid="tokenId">{data?.app?.id}</span>}</>;
}

function Test() {
  const { data } = useRawRequest<any, any, any>({
    query: gql`
      {
        apps {
          id
        }
      }
    `,
  });

  return (
    <>{data && <span data-testid="tokenId">{data?.apps?.[0]?.id}</span>}</>
  );
}
