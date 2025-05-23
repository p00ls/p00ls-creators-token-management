import {useEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import {ColumnLayout, XYCenteredLayout} from "../../lib/ui";
import {OwnerWalletGuard} from "./OwnerWalletGuard";
import {WithTokens} from "./WithTokens";

export function RouterMainLayout() {

  return (
    <div className={'min-h-screen bg-creator-black'}>
      <ScrollToTop/>
      <XYCenteredLayout>
        <ColumnLayout size={'lg'}>
          <OwnerWalletGuard>
            <WithTokens>
              <Outlet/>
            </WithTokens>
          </OwnerWalletGuard>
        </ColumnLayout>
      </XYCenteredLayout>;
    </div>
  );
}

function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
