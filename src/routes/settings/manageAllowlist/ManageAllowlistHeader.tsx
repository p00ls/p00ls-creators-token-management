import {ArrowBackSvg, LockedSvg, P00lsGradientName, RoundIconPill, VersatileLink,} from '../../../lib/ui';
import {SearchAllowlist} from './SearchAllowlist';
import {OnSearchAllowlistFormReset, OnSearchAllowlistFormSubmit, SearchAllowlistForm,} from './useSearchAllowlistForm';
import {useTranslation} from "react-i18next";
import {appRoutes} from "../../routing";

interface Props {
  searchForm: SearchAllowlistForm;
  onSearchSubmit: OnSearchAllowlistFormSubmit;
  onSearchReset: OnSearchAllowlistFormReset;
}

export function ManageAllowlistHeader({
                                        searchForm,
                                        onSearchSubmit,
                                        onSearchReset,
                                      }: Props) {
  const {t} = useTranslation();
  return (
    <div
      className={
        'px-8 py-7 mb-6 flex items-center gap-5 border-b border-raisin-black'
      }
    >
      <VersatileLink href={appRoutes.settings}>
        <ArrowBackSvg className={'w-8 h-8 text-white'}/>
      </VersatileLink>
      <RoundIconPill
        Icon={LockedSvg}
        backgroundColor={'electric-lime'}
        bordered={false}
        gradientName={P00lsGradientName.GRADIENT_01}
      />
      <div className={'flex flex-col gap-1.5 flex-1'}>
        <div className={'font-apercu-mono font-bold text-white'}>
          {t('settings.manage-allowlist-page.title')}
        </div>
        <div className={'font-apercu-mono font-bold text-taupe-gray'}>
          {t('settings.manage-allowlist-page.description')}
        </div>
      </div>
      <div className={'ml-auto'}>
        <SearchAllowlist
          form={searchForm}
          onSubmit={onSearchSubmit}
          onReset={onSearchReset}
        />
      </div>
    </div>
  );
}
