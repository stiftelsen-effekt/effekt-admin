import React from "react";
import { useState } from "react";
import { EffektInput } from "../../../style/elements/input.style";
import { EffektButton } from "../../../style/elements/button.style";
import { useDispatch } from "react-redux";
import { createDonorAction } from "../../../../store/donors/create-donor.actions";
import { CreateWrapper } from "../../../style/elements/create.style";
import { IDonor } from "../../../../models/types";
import { Plus } from "react-feather";
import { useAuth0 } from "@auth0/auth0-react";

interface IProps {
  onSubmit(): void;
}

export const CreateDonor: React.FunctionComponent<IProps> = ({ onSubmit }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState<Partial<IDonor>>({
    email: "",
    name: "",
  });

  const dispatch = useDispatch();

  const submit = () => {
    getAccessTokenSilently().then((token) => {
      dispatch(
        createDonorAction.started({
          token: token,
          donor: { email: state.email, name: state.name },
        }),
      );
    });
    onSubmit();
  };

  return (
    <CreateWrapper>
      <h3>New donor</h3>
      <EffektInput
        value={state.email}
        placeholder="email"
        onChange={(e: any) => setState({ ...state, email: e.target.value })}
      ></EffektInput>
      <EffektInput
        value={state.name}
        placeholder="name"
        onKeyDown={(e) => e.key === "Enter" && submit()}
        onChange={(e: any) => setState({ ...state, name: e.target.value })}
      ></EffektInput>
      <EffektButton onClick={submit}>
        Create <Plus size={16} />
      </EffektButton>
    </CreateWrapper>
  );
};
