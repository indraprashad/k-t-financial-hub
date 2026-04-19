import { useState, useEffect } from 'react'
import { User, Mail, Camera, Save } from 'lucide-react'
import { authApi } from '../../services/auth';
import PageHeader from '../../common/page-header'

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    username: '',
    role: '',
    bio: '',
    avatar: null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tempAvatar, setTempAvatar] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const data = await authApi.getProfile()
        setProfile({
          name: data?.attributes?.name || '',
          email: data?.attributes?.email || '',
          username: data?.attributes?.username || '',
          role: data?.attributes?.role || '',
          bio: data?.attributes?.bio || '',
          avatar: data?.attributes?.image?.attributes?.url || null
        })
      } catch (err) {
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleSave = async () => {
    try {
      setLoading(true)
      const payload = {
        name: profile.name,
        bio: profile.bio
      }
      await authApi.updateProfile(payload)
      // Refresh profile after save
      const data = await authApi.getProfile()
      setProfile({
        name: data?.attributes?.name || '',
        email: data?.attributes?.email || '',
        username: data?.attributes?.username || '',
        role: data?.attributes?.role || '',
        bio: data?.attributes?.bio || '',
        avatar: data?.attributes?.image?.attributes?.url || null
      })
    } catch (err) {
      setError('Failed to save profile')
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        setLoading(true)
        const reader = new FileReader()
        reader.onloadend = async () => {
          try {
            const base64Image = reader.result as string
            setTempAvatar(base64Image)
            await authApi.updateProfile({ avatar_url: base64Image })
            const data = await authApi.getProfile()
            const avatarUrl = data?.attributes?.image?.attributes?.url || null
            const avatarWithTimestamp = avatarUrl ? `${avatarUrl}?t=${Date.now()}` : null
            setProfile({
              name: data?.attributes?.name || '',
              email: data?.attributes?.email || '',
              username: data?.attributes?.username || '',
              role: data?.attributes?.role || '',
              bio: data?.attributes?.bio || '',
              avatar: avatarWithTimestamp
            })
            setTempAvatar(null)
          } catch (err) {
            setError('Failed to upload profile photo')
            setTempAvatar(null)
          } finally {
            setLoading(false)
          }
        }
        reader.readAsDataURL(file)
      } catch (err) {
        setError('Failed to read file')
        setLoading(false)
      }
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title={'Profile'} subtitle={'Manage your personal information'} />
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          
          {/* Avatar Section */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {(tempAvatar || profile.avatar) ? (
                  <img src={tempAvatar || profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="text-gray-400" />
                )}
                {loading && (
                  <div className="absolute inset-0 bg-gray-300 bg-opacity-75 flex items-center justify-center rounded-full">
                    <div className="animate-pulse bg-gray-400 w-full h-full rounded-full"></div>
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-red-600 rounded-full p-1 cursor-pointer hover:bg-red-700">
                <Camera size={16} className="text-white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                    value={profile.email}
                    disabled
                  />
                </div>
              </div>
            </div>
            {/* Bio Section */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                rows={4}
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t mt-8">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center space-x-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              <span>{loading ? 'Saving...' : 'Save Profile'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
