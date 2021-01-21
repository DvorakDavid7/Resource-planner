import unittest
from application import app


class MyTestCase(unittest.TestCase):
    """
    This test case tests correct rendering of views
    """

    def setUp(self):
        self.tester = app.test_client(self)

    def test_login(self):
        response = self.tester.get('/login')
        self.assertEqual(response.status_code, 200)

    def test_table(self):
        response = self.tester.get('/table')
        self.assertEqual(response.status_code, 200)

    def test_table_edit(self):
        response = self.tester.get('/edit/jadam?year_start=2020&year_end=2021&week_start=42&week_end=10')
        self.assertEqual(response.status_code, 200)

    def test_finance(self):
        response = self.tester.get('/finance')
        self.assertEqual(response.status_code, 200)

    def test_finance_edit(self):
        response = self.tester.get('/finance/edit/5443/')
        self.assertEqual(response.status_code, 200)

    @unittest.skip("relative path not found")
    def test_groups(self):
        response = self.tester.get('/groups')
        self.assertEqual(response.status_code, 200)

    def test_projects_edit(self):
        response = self.tester.get('/project_edit/TRDT1301?year_start=2020&year_end=2021&week_start=42&week_end=10')
        self.assertEqual(response.status_code, 200)

    @unittest.skip("takes too long to load")
    def test_projects(self):
        
        response = self.tester.get('/projects')
        self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()
