<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Livewire App</title>
    @vite(['resources/css/app.css', 'resources/js/app.js']) {{-- Si usas Vite --}}
    @livewireStyles
</head>
<body>
    {{ $slot }}

    @livewireScripts
</body>
</html>
