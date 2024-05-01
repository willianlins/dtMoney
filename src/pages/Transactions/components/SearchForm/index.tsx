import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styled'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'
import { memo } from 'react'

const searchFomrSchema = z.object({
  query: z.string(),
})

type SearchFomrInputs = z.infer<typeof searchFomrSchema>

function SearchFormComponent() {
  const fatchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fatchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFomrInputs>({
    resolver: zodResolver(searchFomrSchema),
  })

  async function handleSearchTransactions(data: SearchFomrInputs) {
    await fatchTransactions(data.query)

    console.log(data)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent)
