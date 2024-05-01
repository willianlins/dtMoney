import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styled'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'

const searchFomrSchema = z.object({
  query: z.string(),
})

type SearchFomrInputs = z.infer<typeof searchFomrSchema>

export function SearchForm() {
  const { fatchTransactions } = useContext(TransactionsContext)

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
