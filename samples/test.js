import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1s', target: 10 }, // Ramp-up to 10 users over 1 minute
        { duration: '3s', target: 10 }, // Maintain 10 users for
        { duration: '1s', target: 0 }, // Ramp-down to 0 users over 1 minute
    ],
    thresholds: {
        http_req_duration: ['p(99)<500'], // Requests should be below 100ms
    },
}

export default function () {
//   const res = http.get('https://test.k6.io');
  const res = http.get('http://localhost:3001/');
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}
