import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';

// Our test case for DataService to trigger a non-200 status code to ensure the error handling is working.
// Cannot seem to get this to work or may need to have a different approach. I am more familiar with React or Svelte for testing.
describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should handle error when API response is not 200', () => {
    const mockErrorResponse = { status: 404, statusText: 'Not Found' };
    const mockData = { /* your mock data here */ };

    service.getPosts().subscribe(
      () => fail('Expected an error, but got a successful response'),
      (error) => {
        expect(error.status).toBe(404);
        // Add any other assertions related to error handling
      }
    );

    const req = httpTestingController.expectOne(`${service.baseUrl}/Edgar%20Allan`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData, mockErrorResponse);
  });
});