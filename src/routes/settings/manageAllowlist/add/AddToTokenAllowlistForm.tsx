import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { UseAddToTokenAllowlist } from '../../../../lib/tokens';
import { AddToTokenAllowlistDialog } from './AddToTokenAllowlistDialog';
import {HexString, TokenContract} from "../../../../lib/domain";
import {PrimaryButton, useDialog} from "../../../../lib/ui";
import {useTranslation} from "react-i18next";
import {UseWallet} from "../../../../lib/wallet";
import {Input} from "../../../../lib/ui/form";

interface Props {
  contract: TokenContract;
  ownerAddress: HexString;
  useAddToTokenAllowlist: UseAddToTokenAllowlist;
  useWallet: UseWallet;
  reloadAllowlist: () => void;
}

const FormValues = z.strictObject({
  address: HexString,
});
type FormValues = z.infer<typeof FormValues>;

export function AddToTokenAllowlistForm({
  contract,
  ownerAddress,
  useAddToTokenAllowlist,
  useWallet,
  reloadAllowlist,
}: Props) {
  const { t } = useTranslation();
  const { register, handleSubmit, formState, reset } = useForm<FormValues>({
    resolver: zodResolver(FormValues),
    mode: 'onChange',
  });
  const { openDialog, closeDialog, isDialogOpen } = useDialog();
  const [addressToAdd, setAddressToAdd] = useState<HexString | null>(null);
  const onSubmit: SubmitHandler<FormValues> = useCallback(
    ({ address }) => {
      setAddressToAdd(address);
      openDialog();
    },
    [openDialog]
  );

  const onAddSucceeded = useCallback(() => {
    closeDialog();
    reset();
    setAddressToAdd(null);
    reloadAllowlist();
  }, [closeDialog, reloadAllowlist, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'px-9 flex items-center gap-8'}>
          <div className={'flex-1'}>
            <Input
              id={'address'}
              placeholder={t(
                'settings.manage-allowlist-page.add-form.input-placeholder'
              )}
              {...register('address')}
            />
          </div>
          <div>
            <PrimaryButton
              value={t('settings.manage-allowlist-page.add-form.add-button')}
              primaryButtonThemeName={'electric-lime'}
              type='submit'
              disabled={formState.isSubmitting || !formState.isValid}
            />
          </div>
        </div>
      </form>
      {addressToAdd && (
        <AddToTokenAllowlistDialog
          open={isDialogOpen}
          contract={contract}
          ownerAddress={ownerAddress}
          addressToAdd={addressToAdd}
          onClose={closeDialog}
          onSucceeded={onAddSucceeded}
          useAddToTokenAllowlist={useAddToTokenAllowlist}
          useWallet={useWallet}
        />
      )}
    </>
  );
}
