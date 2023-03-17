import axios from 'axios';

export const client = axios.create({
    baseURL: 'https://api.wisey.app/api/v1',
    headers: {
        'Content-Type': 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YTM1ZDZjMi04NDRmLTQwNTgtODY2ZS1hYzUzNTM4YjhhNDUiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2NzkwNDYwNzIsImV4cCI6MTY3OTk0NjA3Mn0.fZycBB5LPhLksNJ_rdWYx6yPeVOjoSH-86swBjwWVCA',
    },
});


