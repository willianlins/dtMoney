import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import { PriceHighLiht, TransactionContainer, TransactionTable } from './styles'

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionContainer>
        <SearchForm />
        <TransactionTable>
          <tbody>
            <tr>
              <td width="50%">Desensvolvimento de Site</td>
              <td>
                <PriceHighLiht variant="income">R$ 12.000,00</PriceHighLiht>
              </td>
              <td>Venda</td>
              <td>13/04/2022</td>
            </tr>
            <tr>
              <td width="50%">Hambuguer</td>
              <td>
                <PriceHighLiht variant="outcome">- R$ 59,00</PriceHighLiht>
              </td>
              <td>Venda</td>
              <td>18/04/2022</td>
            </tr>
          </tbody>
        </TransactionTable>
      </TransactionContainer>
    </div>
  )
}
