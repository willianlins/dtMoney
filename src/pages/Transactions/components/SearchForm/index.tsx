import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styled'

export function SearchForm() {
  return (
    <SearchFormContainer>
      <input type="text" name="" placeholder="Busque por transações" />
      <button type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
