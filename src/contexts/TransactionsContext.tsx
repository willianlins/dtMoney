import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

interface Transactions {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transaction: Transactions[]
  fatchTransactions: (query?: string) => Promise<void>
  createTransaciton: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transaction, setTransactions] = useState<Transactions[]>([])

  const fatchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }, [])

  const createTransaciton = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, type, category } = data

      const response = await api.post('transactions', {
        description,
        price,
        type,
        category,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fatchTransactions()
  }, [fatchTransactions])

  return (
    <TransactionsContext.Provider
      value={{ transaction, fatchTransactions, createTransaciton }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
