import { Button, Card, FormGroup, InputGroup, Intent } from '@blueprintjs/core';
import React, { ChangeEventHandler, useContext } from 'react';
import { TradeService } from '../services/TradeService';
import { UserContext } from '../services/UserContext';

export const Settings = () => {
  const userCtx = useContext(UserContext);

  const onCMChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    userCtx.userData.settings.ContractComm = Number.parseFloat(e.target.value);
  };

  const onAFChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    userCtx.userData.settings.AssignFee = Number.parseFloat(e.target.value);
  };

  const onSaveClick = async () => {
    await new TradeService(userCtx.userData.accessToken).SaveAccountSettings(
      userCtx.userData.settings
    );
    userCtx.updateSettings();
  };

  return (
    <Card>
      <FormGroup
        helperText="per contract"
        label="Commission"
        labelFor="ocm-input"
        labelInfo=""
      >
        <InputGroup
          id="ocm-input"
          key={`ocm-${userCtx.userData.settings.ID}`}
          placeholder="0.00"
          defaultValue={userCtx.userData.settings.ContractComm.toFixed(2)}
          onChange={onCMChange}
        />
      </FormGroup>

      <FormGroup
        helperText="per contract"
        label="Assignment Fee"
        labelFor="af-input"
        labelInfo=""
      >
        <InputGroup
          id="af-input"
          key={`af-${userCtx.userData.settings.ID}`}
          placeholder="0.00"
          defaultValue={userCtx.userData.settings.AssignFee.toFixed(2)}
          onChange={onAFChange}
        />
      </FormGroup>

      <Button intent={Intent.PRIMARY} onClick={onSaveClick}>
        Save
      </Button>
    </Card>
  );
};
