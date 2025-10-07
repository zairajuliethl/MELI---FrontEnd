const mockNavigate = jest.fn();
const mockParams = { id: 'test-id' };
const mockSearchParams = new URLSearchParams();

export const useNavigate = () => mockNavigate;
export const useParams = () => mockParams;
export const useSearchParams = () => [mockSearchParams];

export const __resetMocks = () => {
  mockNavigate.mockClear();
  mockSearchParams.set('search', '');
};

export { mockNavigate, mockParams, mockSearchParams };