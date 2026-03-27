const APPLICATIONS_KEY = 'internship_applications'
const PROFILE_KEY = 'internship_profile'

function hasChromeStorage() {
  return typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local
}

export async function getApplications() {
  if (hasChromeStorage()) {
    const result = await chrome.storage.local.get([APPLICATIONS_KEY])
    return result[APPLICATIONS_KEY] || []
  }

  const raw = localStorage.getItem(APPLICATIONS_KEY)
  return raw ? JSON.parse(raw) : []
}

export async function saveApplications(applications) {
  if (hasChromeStorage()) {
    await chrome.storage.local.set({
      [APPLICATIONS_KEY]: applications
    })
    return
  }

  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications))
}

export async function addApplication(application) {
  const current = await getApplications()
  const updated = [application, ...current]
  await saveApplications(updated)
  return updated
}

export async function updateApplication(id, updates) {
  const current = await getApplications()
  const updated = current.map(item =>
    item.id === id ? { ...item, ...updates } : item
  )
  await saveApplications(updated)
  return updated
}

export async function deleteApplication(id) {
  const current = await getApplications()
  const updated = current.filter(item => item.id !== id)
  await saveApplications(updated)
  return updated
}

export async function getProfile() {
  if (hasChromeStorage()) {
    const result = await chrome.storage.local.get([PROFILE_KEY])
    return result[PROFILE_KEY] || {
      name: 'Your Name',
      email: 'you@example.com'
    }
  }

  const raw = localStorage.getItem(PROFILE_KEY)
  return raw
    ? JSON.parse(raw)
    : {
        name: 'Your Name',
        email: 'you@example.com'
      }
}

export async function saveProfile(profile) {
  if (hasChromeStorage()) {
    await chrome.storage.local.set({
      [PROFILE_KEY]: profile
    })
    return
  }

  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}