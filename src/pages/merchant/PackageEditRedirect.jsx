import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useMerchant } from '../../context/MerchantContext'
import CreatePackagePage from './CreatePackagePage'

const PackageEditRedirect = () => {
  const { id } = useParams()
  const { events, loading } = useMerchant()

  if (loading) {
    return null
  }

  const numericId = parseInt(id, 10)
  const match = (events || []).find(event =>
    (event.packages || []).some(pkg => pkg.id === numericId || pkg.id === id)
  )

  if (match) {
    return <Navigate to={`/merchant/events/${match.id}/edit?package=${id}`} replace />
  }

  return <CreatePackagePage />
}

export default PackageEditRedirect
