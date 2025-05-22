import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import {HexString} from "../../../lib/domain";

const SearchAllowlistFormValues = z.strictObject({
  address: HexString,
});
export type SearchAllowlistFormValues = z.infer<
  typeof SearchAllowlistFormValues
>;

export type SearchAllowlistForm = UseFormReturn<SearchAllowlistFormValues>;

export type OnSearchAllowlistFormSubmit =
  SubmitHandler<SearchAllowlistFormValues>;

export type OnSearchAllowlistFormReset = () => void;

export function useSearchAllowlistForm() {
  const [searchedAddress, setSearchedAddress] = useState<HexString | undefined>(
    undefined
  );

  const form = useForm<SearchAllowlistFormValues>({
    resolver: zodResolver(SearchAllowlistFormValues),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<SearchAllowlistFormValues> = useCallback(
    ({ address }) => {
      setSearchedAddress(address);
    },
    []
  );

  const onReset: OnSearchAllowlistFormReset = useCallback(() => {
    form.reset();
    setSearchedAddress(undefined);
  }, [form]);

  return {
    searchedAddress: searchedAddress,
    form,
    onSubmit,
    onReset,
  };
}
