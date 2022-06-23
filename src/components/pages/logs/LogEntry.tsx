import { useAuth0 } from '@auth0/auth0-react';
import { DateTime } from 'luxon';
import React from 'react';
import JSONTree from 'react-json-tree';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { AppState } from '../../../models/state';
import { clearCurrentLogEntry, fetchLogEntryAction } from '../../../store/logs/logs.actions';
import { longDateTime } from '../../../util/formatting';
import { ResourceHeader, ResourceSubHeader } from '../../style/elements/headers.style';
import { Page } from '../../style/elements/page.style';

interface IParams {
  id: string;
}

// This is a workaround for TypeScript
// https://stackoverflow.com/questions/69220088/jsx-element-class-does-not-support-attributes-because-it-does-not-have-a-props
interface JSONTreeFix extends React.Component {
  render;
  context;
  setState;
  forceUpdate;
  props;
  state;
  refs;
}

const JSONView = JSONTree as unknown as {
  new (): JSONTreeFix;
};

export const LogEntryComponent: React.FunctionComponent<RouteComponentProps<IParams>> = ({
  match,
}: RouteComponentProps<IParams>) => {
  const entryId = parseInt(match.params.id);

  const entry = useSelector((state: AppState) => state.logs.currentEntry);
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  if (entry && entry.ID !== entryId) {
    getAccessTokenSilently().then((token) => {
      dispatch(clearCurrentLogEntry());
      dispatch(fetchLogEntryAction.started({ id: entryId, token }));
    });
  } else if (!entry) {
    getAccessTokenSilently().then((token) => {
      dispatch(fetchLogEntryAction.started({ id: entryId, token }));
    });
  }

  if (entry) {
    return (
      <Page>
        <ResourceHeader hasSubHeader={true}>
          Log entry {entry.ID} | {entry.label}
        </ResourceHeader>
        <ResourceSubHeader>
          {longDateTime(DateTime.fromISO(entry.timestamp, { setZone: true }))}
        </ResourceSubHeader>

        <JSONView
          data={entry.result}
          valueRenderer={(value, keyPath) =>
            keyPath === 'file' ? (
              <span style={{ fontFamily: 'monospace', whiteSpace: 'pre', display: 'block' }}>
                {value}
              </span>
            ) : (
              <span>{value}</span>
            )
          }
          shouldExpandNode={() => true}
        />
      </Page>
    );
  } else {
    return <Page>Loading...</Page>;
  }
};
