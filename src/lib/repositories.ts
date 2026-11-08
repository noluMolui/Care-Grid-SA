import type { User } from '@supabase/supabase-js'
import { supabase } from './supabase'
import type { CheckInInsert, CheckInUpdate, PostInsert, PostUpdate, ProfileUpdate, ResourceCategory, ResourceInsert, ResourceUpdate } from './supabase'

function requireClient() {
  if (!supabase) throw new Error('Supabase is not configured.')
  return supabase
}

export async function getProfile(userId: string) {
  const { data, error } = await requireClient().from('profiles').select('*').eq('id', userId).single()
  if (error) throw error
  return data
}

export async function updateProfile(userId: string, changes: ProfileUpdate) {
  const { data, error } = await requireClient().from('profiles').update(changes).eq('id', userId).select().single()
  if (error) throw error
  return data
}

export async function deleteAccount(user: User) {
  const client = requireClient()
  if (!user.id) throw new Error('Unable to identify the signed-in account.')
  const { error } = await client.rpc('delete_my_account')
  if (error) throw error
}

export async function listResources(userId: string, category?: ResourceCategory, query?: string) {
  const client = requireClient()
  let request = client.from('resources').select('*').eq('is_published', true).order('created_at', { ascending: false })
  if (category) request = request.eq('category', category)
  if (query) {
    const safeQuery = query.replace(/[(),]/g, ' ')
    request = request.or(`title.ilike.%${safeQuery}%,description.ilike.%${safeQuery}%,category.ilike.%${safeQuery}%`)
  }
  const { data: resources, error } = await request
  if (error) throw error
  const { data: bookmarks, error: bookmarkError } = await client.from('resource_bookmarks').select('resource_id').eq('user_id', userId)
  if (bookmarkError) throw bookmarkError
  return { resources, bookmarkedIds: new Set((bookmarks ?? []).map(bookmark => bookmark.resource_id)) }
}

export async function setResourceBookmark(userId: string, resourceId: string, bookmarked: boolean) {
  const client = requireClient()
  if (bookmarked) {
    const { error } = await client.from('resource_bookmarks').insert({ user_id: userId, resource_id: resourceId })
    if (error) throw error
  } else {
    const { error } = await client.from('resource_bookmarks').delete().eq('user_id', userId).eq('resource_id', resourceId)
    if (error) throw error
  }
}

export async function createResource(input: ResourceInsert) {
  const { data, error } = await requireClient().from('resources').insert(input).select().single()
  if (error) throw error
  return data
}

export async function updateResource(id: string, changes: ResourceUpdate) {
  const { data, error } = await requireClient().from('resources').update(changes).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteResource(id: string) {
  const { error } = await requireClient().from('resources').delete().eq('id', id)
  if (error) throw error
}

export async function listCheckIns(userId: string) {
  const { data, error } = await requireClient().from('check_ins').select('*').eq('user_id', userId).order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createCheckIn(input: CheckInInsert) {
  const { data, error } = await requireClient().from('check_ins').insert(input).select().single()
  if (error) throw error
  return data
}

export async function updateCheckIn(id: string, userId: string, changes: CheckInUpdate) {
  const { data, error } = await requireClient().from('check_ins').update(changes).eq('id', id).eq('user_id', userId).select().single()
  if (error) throw error
  return data
}

export async function deleteCheckIn(id: string, userId: string) {
  const { error } = await requireClient().from('check_ins').delete().eq('id', id).eq('user_id', userId)
  if (error) throw error
}

export async function listPosts() {
  const { data, error } = await requireClient().from('posts').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createPost(input: PostInsert) {
  const { data, error } = await requireClient().from('posts').insert(input).select().single()
  if (error) throw error
  return data
}

export async function updatePost(id: string, userId: string, changes: PostUpdate) {
  const { data, error } = await requireClient().from('posts').update(changes).eq('id', id).eq('author_id', userId).select().single()
  if (error) throw error
  return data
}

export async function deletePost(id: string, userId: string) {
  const { error } = await requireClient().from('posts').delete().eq('id', id).eq('author_id', userId)
  if (error) throw error
}

export async function reportPost(input: { post_id: string; reporter_id: string; reason: string }) {
  const { error } = await requireClient().from('post_reports').insert(input)
  if (error) throw error
}
