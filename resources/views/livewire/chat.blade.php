<div>
  <div class="flex h-[550px] text-sm border rounded-xl shadow overflow-hidden bg-gray-300">

    <!-- Left: User List -->
    <div class="w-1/4 border-r bg-gray-300">
      <div class="p-4 font-bold text-gray-900 border-b border-gray-400">Users</div>
      <div class="divide-y divide-gray-400">
        @foreach ($users as $user)
          <div wire:click="selectUser({{ $user->id }})" 
               class="p-3 cursor-pointer hover:bg-blue-200 transition
                      {{ $selectedUser->id === $user->id ? 'bg-blue-200 font-semibold text-gray-900' : 'text-gray-800'}}">
            <div>{{ $user->name }}</div>
            <div class="text-xs text-gray-700">{{ $user->email }}</div>
          </div>
        @endforeach
      </div>
    </div>

    <!-- Right: Chat Section -->
    <div class="w-3/4 flex flex-col">
      <!-- Header -->
      <div class="p-4 border-b bg-gray-300 border-gray-400 flex items-center gap-3">
        <!-- Flecha atrás -->
        <button 
          onclick="history.back()" 
          class="p-1 rounded hover:bg-gray-400 transition"
          aria-label="Go back">
          <!-- Flecha SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div>
          <div class="text-lg font-semibold text-gray-900">{{ $selectedUser->name }}</div>
          <div class="text-xs text-gray-700">{{ $selectedUser->email }}</div>
        </div>
      </div>

      <!-- Messages -->
      <div class="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-300">
        @foreach ($messages as $message)
          <div class="flex {{ $message->sender_id === auth()->id() ? 'justify-end' : 'justify-start' }}">
            <div class="max-w-xs px-4 py-2 rounded-2xl shadow
                        {{ $message->sender_id === auth()->id() 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-400 text-gray-900' }}">
              {{ $message->message }}
            </div>
          </div>
        @endforeach
      </div>

      <!-- Input -->
      <form wire:submit="submit" class="p-4 border-t bg-gray-300 border-gray-400 flex items-center gap-2">
        <input
          wire:model="newMessage"
          type="text"
          class="flex-1 border border-gray-500 rounded-full px-4 py-2 text-sm text-gray-900 bg-gray-300 focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full transition"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</div>
