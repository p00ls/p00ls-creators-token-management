import {OnSearchAllowlistFormReset, OnSearchAllowlistFormSubmit, SearchAllowlistForm,} from './useSearchAllowlistForm';
import {useTranslation} from "react-i18next";
import {PrimaryButton, SearchSvg} from "../../../lib/ui";
import {Input} from "../../../lib/ui/form";

interface Props {
  form: SearchAllowlistForm;
  onSubmit: OnSearchAllowlistFormSubmit;
  onReset: OnSearchAllowlistFormReset;
}

export function SearchAllowlist({form, onSubmit, onReset}: Props) {
  const {t} = useTranslation();
  const {handleSubmit, register, formState} = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex items-center gap-5'}>
        <div className={'w-[250px]'}>
          <Input
            id={'address'}
            placeholder={t(
              'settings.manage-allowlist-page.search-form.input-placeholder'
            )}
            icon={SearchSvg}
            iconSize={'md'}
            {...register('address')}
          />
        </div>
        <div>
          <PrimaryButton
            value={t(
              'settings.manage-allowlist-page.search-form.search-button'
            )}
            primaryButtonThemeName={'electric-lime'}
            type='submit'
            disabled={formState.isSubmitting || !formState.isValid}
          />
        </div>
        <div>
          <PrimaryButton
            onClick={onReset}
            value={t('settings.manage-allowlist-page.search-form.reset-button')}
            primaryButtonThemeName={'outer-space'}
          />
        </div>
      </div>
    </form>
  );
}
