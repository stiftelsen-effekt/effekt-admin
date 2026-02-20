import React, { useState } from "react";
import { AdoveoList } from "../../modules/adoveo/list/AdoveoList";
import { AdoveoFilterComponent } from "../../modules/adoveo/list/filters/AdoveoFilter";
import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { AdoveoListWrapper } from "../../modules/adoveo/list/AdoveoList.style";
import { EffektButton } from "../../style/elements/button.style";
import { CreateAdoveoDialog } from "../../modules/adoveo/create/CreateAdoveoDialog";
import DonorSearchDialog from "../../modules/donors/selection/DonorSelectionDialog";
import { Plus } from "react-feather";
import { PageActionsWrapper } from "../../modules/adoveo/Adoveo.style";

export const AdoveoPage: React.FunctionComponent = () => {
  const [createDialogVisible, setCreateDialogVisible] = useState(false);

  return (
    <Page>
      <MainHeader>Adoveo Fundraisers</MainHeader>

      <PageActionsWrapper>
        <EffektButton onClick={() => setCreateDialogVisible(true)}>
          <Plus size={18} style={{ marginRight: "5px" }} /> Add fundraiser
        </EffektButton>
      </PageActionsWrapper>

      <AdoveoFilterComponent />

      <AdoveoListWrapper>
        <AdoveoList />
      </AdoveoListWrapper>

      <CreateAdoveoDialog
        visible={createDialogVisible}
        onClose={() => setCreateDialogVisible(false)}
      />
      <DonorSearchDialog />
    </Page>
  );
};
